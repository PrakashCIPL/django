# chat/views.py

from django.shortcuts import render
from django.http import JsonResponse
from django.urls import reverse
from .models import ChatMessage

def chat_view(request):
    if request.method == 'POST':
        user_message = request.POST.get('message', '')
        
        # Here, you would integrate your chatbot code to generate the response
        # For now, we'll use a placeholder response
        bot_response = "This is a placeholder response. Integrate your chatbot here."
        
        # Save the message and response
        ChatMessage.objects.create(user_message=user_message, bot_response=bot_response)
        
        return JsonResponse({'response': bot_response})
    
    context = {
        'chat_url': reverse('chat'),
    }
    return render(request, 'chat/chat.html', context)