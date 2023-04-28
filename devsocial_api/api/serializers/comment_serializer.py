from rest_framework import serializers
from api.models import Comment
# from .user_serializer import UserSerializer
from .userPreview_serializer import UserPreviewSerializer



class CommentSerializer(serializers.ModelSerializer):

    # userData = UserSerializer(source='user', read_only=True)
    userData = UserPreviewSerializer(source='user', read_only=True)

    comment = serializers.CharField(allow_blank=False, allow_null=False, required=True, error_messages={
        'blank': 'Comment cannot be blank',
        'required': 'Comment is required'
    })



    # user_id = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False)
    # post_id = models.ForeignKey(Post, on_delete=models.CASCADE, blank=False, null=False)
    # comment = models.CharField(
    #     blank=False, 
    #     null=False,
    #     error_messages=generate_error_messages('comment', blank_null_error_messages)
    # )



    class Meta:
        model = Comment
        fields = ('id', 'post', 'user', 'comment', 'userData')   
    
    
        