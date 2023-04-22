from django.core.exceptions import ValidationError
from django.db import models
from api.models import User


class Friend(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False)
    friend_id = models.IntegerField(blank=False, null=False)

    class Meta:
        unique_together = ['user_id', 'friend_id']

    def clean(self):
        if self.user_id == self.friend_id:
            raise ValidationError('A user cannot be friends with themselves.')

