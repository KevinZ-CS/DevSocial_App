from django.db import models
from api.models import User
from api.models import Post
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

class Comment(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False)
    post_id = models.ForeignKey(Post, on_delete=models.CASCADE, blank=False, null=False)
    comment = models.CharField(
        blank=False, 
        null=False,
        error_messages=generate_error_messages('comment', blank_null_error_messages)
    )