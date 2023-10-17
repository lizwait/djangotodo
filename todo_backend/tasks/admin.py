from django.contrib import admin
from .models import Task

# Define an admin class for the Task model
class TaskAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'description', 'completed']

# Register the Task model with the TaskAdmin class
admin.site.register(Task, TaskAdmin)