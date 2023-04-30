from django.core.exceptions import ValidationError
from django.db import models
from api.models import User


class Friend(models.Model):
    # user_id = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False)
    # friend_id = models.IntegerField(blank=False, null=False)

    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False)
    friend = models.IntegerField(blank=False, null=False)

    class Meta:
        unique_together = ['user', 'friend']

    # def clean(self):
    #     if self.user == self.friend:
    #         raise ValidationError('A user cannot be friends with themselves.')

