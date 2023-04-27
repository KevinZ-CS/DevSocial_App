from rest_framework import serializers
from api.models import Post
from django.core.validators import FileExtensionValidator
from .user_serializer import UserSerializer
from .comment_serializer import CommentSerializer

class PostSerializer(serializers.ModelSerializer):
       
    user = UserSerializer(source='user_id', read_only=True)
    comments = CommentSerializer(source="post_id", many=True, read_only=True)
      
    caption = serializers.CharField(allow_blank=False, allow_null=False, required=True, error_messages={
        'blank': 'Caption cannot be blank',
        'required': 'Caption is required'
    })
#     user_id = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False)
    github_url = serializers.CharField(allow_blank=True, allow_null=True, required=False)
    demo_url = serializers.CharField(allow_blank=True, allow_null=True, required=False)

    image = serializers.ImageField(
        required=False, 
        error_messages={
            'invalid_image': 'Please provide a valid image file of type JPEG, PNG, or GIF.'
        },
        allow_empty_file=False,
        validators=[FileExtensionValidator(['jpg', 'jpeg', 'png', 'gif'])])
    
    # created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)

    class Meta:
        model = Post
        fields = ('id', 'user_id', 'github_url', 'demo_url', 'caption', 'image', 'user', 'comments')   
        # ordering = ['-created_at'] # sort by created_at field in descending order

