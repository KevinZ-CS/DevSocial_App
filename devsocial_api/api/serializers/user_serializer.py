from django.core.exceptions import ValidationError
from api.models import User
from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers


def validate_image(value):
    valid_formats = ('jpeg', 'jpg', 'png', 'gif')
    if value.file.content_type not in map(lambda x: f'image/{x}', valid_formats):
        raise ValidationError(f'Unsupported file format. Only {", ".join(valid_formats)} files are supported.')


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


    image = serializers.ImageField(required=True, validators=[validate_image])

    class Meta:
        model = User
        fields = '__all__'

 
    # def validate(self, data):
    #     """
    #     Check that all fields are present and not blank or null
    #     """
    #     for field_name, value in data.items():
    #         if value in (None, ''):
    #             raise serializers.ValidationError(self.fields[field_name].error_messages['required'])

    #     # Validate password
    #     password = data.get('password')
    #     if password:
    #         password_validator = RegexValidator(
    #             regex=r'^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+]).{8,}$',
    #             message=_('Password must be at least 8 characters long, and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.')
    #         )
    #         try:
    #             password_validator(password)
    #         except ValidationError as e:
    #             raise serializers.ValidationError({'password': e.messages})
            
    #      # Validate password
    #     confirm_password = data.get('confirm_password')

    #     if password and confirm_password and password != confirm_password:
    #         raise serializers.ValidationError({'confirm_password': 'Passwords do not match'})
            
    #        # Validate image
    #     image = data.get('image')
    #     if image:
    #         try:
    #             validate_image(image)
    #         except ValidationError as e:
    #             raise serializers.ValidationError({'image': e.messages})

    #     return data
    
