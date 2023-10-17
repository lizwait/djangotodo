from rest_framework import serializers
from .models import Task  # Import the Task model from models.py

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'title', 'description', 'completed')
