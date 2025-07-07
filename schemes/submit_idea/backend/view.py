from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import BusinessIdea

@csrf_exempt
def submit_idea(request):
    if request.method == "POST":
        data = json.loads(request.body)
        idea = BusinessIdea.objects.create(
            language=data.get("language"),
            idea_text=data.get("idea")
        )
        return JsonResponse({"message": "Idea submitted successfully", "id": idea.id}, status=201)
    return JsonResponse({"error": "Only POST allowed"}, status=405)

