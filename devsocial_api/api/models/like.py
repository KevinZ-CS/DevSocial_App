from django.db import models
from api.models import User
from api.models import Post

class Like(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False)
    post_id = models.ForeignKey(Post, on_delete=models.CASCADE, blank=False, null=False)