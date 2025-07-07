from django.shortcuts import render,redirect
def home(request):
   return  render(request, "home.html")
# import pyttsx3
# import speech_recognition as sr

# # Text-to-Speech Engine
# engine = pyttsx3.init()
# def speak(text):
#     engine.say(text)
#     engine.runAndWait()

# # Listen karne ke liye
# def listen():
#     r = sr.Recognizer()
#     with sr.Microphone() as source:
#         print("Listening...")
#         audio = r.listen(source)

#     try:
#         command = r.recognize_google(audio)
#         print(f"You said: {command}")
#         return command.lower()
#     except sr.UnknownValueError:
#         speak("Sorry, I did not understand.")
#         return ""
#     except sr.RequestError:
#         speak("Network issue.")
#         return ""

# # Main Function
# def run_assistant():
#     speak("Hi, I'm your assistant. How can I help you?")
#     while True:
#         command = listen()
#         if "hello" in command:
#             speak("Hello! How are you?")
#         elif "your name" in command:
#             speak("I'm your Python voice assistant.")
#         elif "stop" in command:
#             speak("Okay, goodbye!")
#             break
#         else:
#             speak("I didn't understand that.")

# run_assistant()
