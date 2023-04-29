from rest_framework import serializers
from api.models import Friend

class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friend
        fields = ('friend_id', 'user_id')   
        # fields = ('id', 'post', 'user')   