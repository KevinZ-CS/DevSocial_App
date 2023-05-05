from django.db import models
from api.models import User
from api.models import Post

class Like(models.Model):
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, blank=False, null=False)