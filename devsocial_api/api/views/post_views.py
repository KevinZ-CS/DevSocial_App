from rest_framework.views import APIView
from rest_framework.response import Response
from api.serializers import PostSerializer
from api.models import Post
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.core.exceptions import ObjectDoesNotExist
from django.core.files.storage import default_storage

class AuthenticatedAPIView(APIView):
    authentication_classes = [JWTAuthentication, SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

class PostList(AuthenticatedAPIView):

    def get(self, request):
        posts = Post.objects.all().order_by('-created_at') 
        serializer = PostSerializer(posts, many=True) 
        return Response(serializer.data)

class PostDetail(AuthenticatedAPIView):

    def get(self, request, pk):
        try:
            posts = Post.objects.filter(user=pk).order_by('-created_at')
        except (ObjectDoesNotExist, ValueError):
            return Response({'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = PostSerializer(posts, many=True) 
        return Response(serializer.data)

    def patch(self, request, pk):
        post = Post.objects.get(id=pk)
        serializer = PostSerializer(post, data=request.data, partial=True)
        if serializer.is_valid():
            if 'image' in request.data:
                default_storage.delete(post.image.name)
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        post = Post.objects.get(id=pk)
        post.delete()
        return Response("Post successfully deleted!")

class PostCreate(AuthenticatedAPIView):
    def post(self, request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)