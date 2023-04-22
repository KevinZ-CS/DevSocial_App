from django.db import models
from api.models import User

class Post(models.Model):
    content = models.TextField(blank=False, null=False)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False)
    github_url = models.CharField(blank=False, null=False)
    demo_url = models.CharField(blank=False, null=False)
    caption = models.CharField(blank=False, null=False)
    # image
    