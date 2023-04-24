from django.core.exceptions import ValidationError
from api.models import User
from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from django.core.validators import FileExtensionValidator


class UserSerializer(serializers.ModelSerializer):

    first_name = serializers.CharField(allow_blank=False, allow_null=False, required=True, error_messages={
        'blank': 'First name cannot be blank',
        'required': 'First name is required'
    })
    last_name = serializers.CharField(allow_blank=False, allow_null=False, required=True, error_messages={
        'blank': 'Last name cannot be blank',
        'required': 'Last name is required'
    })
    occupation = serializers.CharField(allow_blank=False, allow_null=False, required=True, error_messages={
        'blank': 'Occupation cannot be blank',
        'required': 'Occupation is required'
    })
    location = serializers.CharField(allow_blank=False, allow_null=False, required=True, error_messages={
        'blank': 'Location cannot be blank',
        'required': 'Location is required'
    })
    bio = serializers.CharField(allow_blank=False, allow_null=False, required=True, error_messages={
        'blank': 'Bio cannot be blank',
        'required': 'Bio is required'
    })
    github_url = serializers.CharField(allow_blank=False, allow_null=False, required=True, error_messages={
        'blank': 'Github url cannot be blank',
        'required': 'Github burl is required'
    })
    linkedin_url = serializers.CharField(allow_blank=False, allow_null=False, required=True, error_messages={
        'blank': 'LinkedIn url cannot be blank',
        'required': 'LinkedIn url is required'
    })

    password = serializers.CharField(write_only=True, validators=[
        RegexValidator(
            regex=r'^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+]).{8,}$',
            message=_('Password must be at least 8 characters long, and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.')
        )
    ])

    image = serializers.ImageField(
        required=True, 
        error_messages={
            'required': 'Please provide an image.',
            'invalid_image': 'Please provide a valid image file of type JPEG, PNG, or GIF.'
        },
        allow_empty_file=False,
        validators=[FileExtensionValidator(['jpg', 'jpeg', 'png', 'gif'])]
    )
   

    class Meta:
        model = User
        fields = '__all__'

 
 
    
