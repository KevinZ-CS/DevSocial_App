from rest_framework.views import APIView
from rest_framework.response import Response
from api.serializers import PostSerializer
from api.models import Post
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
import pdb

class AuthenticatedAPIView(APIView):
    authentication_classes = [JWTAuthentication, SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]


class PostList(AuthenticatedAPIView):

    def get(self, request):
        # posts = Post.objects.select_related('user_id').order_by('-created_at') 
        # posts = Post.objects.prefetch_related('post_id', 'user_id').order_by('-created_at')
        # posts = Post.objects.order_by('-created_at') 
        posts = Post.objects.all().order_by('-created_at') 
        serializer = PostSerializer(posts, many=True) 
        return Response(serializer.data)

class PostDetail(AuthenticatedAPIView):

    def get(self, request, pk):
        # pdb.set_trace()
        post = Post.objects.get(id=pk)
        serializer = PostSerializer(post)
        return Response(serializer.data)

    def put(self, request, pk):
        post = Post.objects.get(id=pk)
        serializer = PostSerializer(post, data=request.data)
        if serializer.is_valid():
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