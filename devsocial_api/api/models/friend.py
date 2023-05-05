from django.db import models
from api.models import User

class Friend(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False)
    friend = models.IntegerField(blank=False, null=False)

    class Meta:
        unique_together = ['user', 'friend']

