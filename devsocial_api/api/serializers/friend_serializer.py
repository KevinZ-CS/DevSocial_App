from rest_framework import serializers
from api.models import Friend

class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friend
        fields = ('id', 'user', 'friend')   

    def validate(self, data):
        user = data['user']
        friend = data['friend']
        if user.id == friend:
            raise serializers.ValidationError('A user cannot be friends with themselves.')
        return data