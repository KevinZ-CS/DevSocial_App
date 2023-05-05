from django.db import models
from api.models import User
from django.utils.translation import gettext_lazy as _

class Post(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False)
    github_url = models.CharField(
        blank=False, 
        null=False,
    )
    demo_url = models.CharField(
        blank=False, 
        null=False,
    )
    caption = models.CharField(
        blank=False, 
        null=False,
    )
    image = models.ImageField(upload_to='images/', blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    