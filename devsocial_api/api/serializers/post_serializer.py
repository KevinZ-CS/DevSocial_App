from rest_framework import serializers
from api.models import Post
from django.core.validators import FileExtensionValidator
from .comment_serializer import CommentSerializer
from . userPreview_serializer import UserPreviewSerializer
from .like_serializer import LikeSerializer

class PostSerializer(serializers.ModelSerializer):
       
    userData = UserPreviewSerializer(source='user', read_only=True)
    comments = CommentSerializer(many=True, read_only=True, source='comment_set')
    likes = LikeSerializer(many=True, read_only=True, source='like_set')
      
    caption = serializers.CharField(allow_blank=False, allow_null=False, required=True, error_messages={
        'blank': 'Caption cannot be blank',
        'required': 'Caption is required'
    })

    github_url = serializers.CharField(allow_blank=True, allow_null=True, required=False)
    demo_url = serializers.CharField(allow_blank=True, allow_null=True, required=False)

    image = serializers.ImageField(
        required=False, 
        error_messages={
            'invalid_image': 'Please provide a valid image file of type JPEG, PNG, or GIF.'
        },
        allow_empty_file=False,
        validators=[FileExtensionValidator(['jpg', 'jpeg', 'png', 'gif'])])
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        comments = instance.comment_set.all().order_by('-created_at')
        representation['comments'] = CommentSerializer(comments, many=True).data
        return representation

    class Meta:
        model = Post
        fields = ('id', 'github_url', 'demo_url', 'caption', 'image', 'user', 'userData', 'comments', 'likes')   


