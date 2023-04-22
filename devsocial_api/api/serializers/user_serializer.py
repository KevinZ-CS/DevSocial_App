from rest_framework import serializers
from django.core.exceptions import ValidationError
from models import User, validate_not_blank



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
    
    def validate(self, data):
        errors = {}

        for field_name, value in data.items():
            try:
                validate_not_blank(value)
            except ValidationError as error:
                errors[field_name] = error.message

        if errors:
            raise serializers.ValidationError(errors)

        return data