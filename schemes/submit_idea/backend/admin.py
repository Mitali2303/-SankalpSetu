
from django.contrib import admin
from .models import BusinessIdea
from django.contrib import admin
from .models import Idea

@admin.register(BusinessIdea)
class BusinessIdeaAdmin(admin.ModelAdmin):
    list_display = ('language', 'idea_text', 'submitted_at')
    search_fields = ('language', 'idea_text')



admin.site.register(Idea)