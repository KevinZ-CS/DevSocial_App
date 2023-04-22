from django.db import models
from api.models import User
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

def generate_error_messages(attribute, messages):
    error_dict = {}
    for key, message in messages.items():
        error_dict[key] = message.format(attribute=attribute)
    return error_dict

blank_null_error_messages = {
    'blank': _('The {attribute} field cannot be be blank.'),
    'null': _('The {attribute} field cannot be null.')
}

def validate_image(value):
    valid_formats = ('jpeg', 'jpg', 'png', 'gif')
    if value.file.content_type not in map(lambda x: f'image/{x}', valid_formats):
        raise ValidationError(f'Unsupported file format. Only {", ".join(valid_formats)} files are supported.')

class Post(models.Model):
    content = models.TextField(
        blank=False, 
        null=False,
        error_messages=generate_error_messages('content', blank_null_error_messages)
    )
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False)
    github_url = models.CharField(
        blank=False, 
        null=False,
        error_messages=generate_error_messages('github url', blank_null_error_messages)
    )
    demo_url = models.CharField(
        blank=False, 
        null=False,
        error_messages=generate_error_messages('demo url', blank_null_error_messages)
    )
    caption = models.CharField(
        blank=False, 
        null=False,
        error_messages=generate_error_messages('caption', blank_null_error_messages)
    )
    image = models.ImageField(upload_to='images/', blank=True, null=True, validators=[validate_image])
    