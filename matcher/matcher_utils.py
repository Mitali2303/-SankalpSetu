import json
import os
from django.conf import settings
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from deep_translator import GoogleTranslator
from langdetect import detect

# Load NGO data from JSON
json_path = os.path.join(settings.BASE_DIR, 'matcher', 'women_business_ngos_50.json')
with open(json_path, "r", encoding="utf-8") as f:
    ngos = json.load(f)

# Load SentenceTransformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Preprocess and encode all NGO vectors once
ngo_descs = [f"{ngo.get('services', '')} {ngo.get('description', '')}" for ngo in ngos]
ngo_vecs = model.encode(ngo_descs)

# Matching function
def match_ngo(user_input, top_k=5):
    try:
        lang = detect(user_input)
    except:
        lang = "en"

    try:
        translated_input = GoogleTranslator(source='auto', target='en').translate(user_input)
    except:
        return ["Translation failed."]

    user_vec = model.encode([translated_input])
    sims = cosine_similarity([user_vec[0]], ngo_vecs)[0]
    matches = sorted(zip(sims, ngos), key=lambda x: x[0], reverse=True)[:top_k]

    result = []
    for sim, ngo in matches:
        try:
            translated_services = GoogleTranslator(source='en', target=lang).translate(ngo.get("services", ""))
            translated_desc = GoogleTranslator(source='en', target=lang).translate(ngo.get("description", ""))
        except:
            translated_services = ngo.get("services", "")
            translated_desc = ngo.get("description", "")

        result.append(
            f"{ngo['name']} ({ngo['location']})\n"
            f"Website: {ngo.get('website', 'N/A')}\n"
            f"Services: {translated_services}\n"
            f"Description: {translated_desc}\n"
            f"Similarity Score: {round(sim, 2)}"
        )


    return "\n\n".join(result)