from django.db import models
from api.models import User
from api.models import Post
from django.utils.translation import gettext_lazy as _

class Comment(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, blank=False, null=False)
    comment = models.CharField(
        blank=False, 
        null=False,
    )
    created_at = models.DateTimeField(auto_now_add=True)