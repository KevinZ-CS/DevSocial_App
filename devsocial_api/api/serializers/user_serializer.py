from rest_framework import serializers
from django.core.exceptions import ValidationError
from models import User, validate_not_blank



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
    
