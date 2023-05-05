from rest_framework import serializers
from api.models import Comment
from .userPreview_serializer import UserPreviewSerializer

class CommentSerializer(serializers.ModelSerializer):

    userData = UserPreviewSerializer(source='user', read_only=True)

    comment = serializers.CharField(allow_blank=False, allow_null=False, required=True, error_messages={
        'blank': 'Comment cannot be blank',
        'required': 'Comment is required'
    })

    class Meta:
        model = Comment
        fields = ('id', 'post', 'user', 'comment', 'userData')   
    
    
        