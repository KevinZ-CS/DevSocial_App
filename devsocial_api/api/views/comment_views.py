from rest_framework.views import APIView
from rest_framework.response import Response
from api.serializers import CommentSerializer
from api.models import Comment
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.parsers import JSONParser
import pdb


class AuthenticatedAPIView(APIView):
    authentication_classes = [JWTAuthentication, SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]


class CommentList(AuthenticatedAPIView):

    def get(self, request):
        # posts = Post.objects.select_related('user_id').order_by('-created_at') 
        # posts = Post.objects.prefetch_related('post_id', 'user_id').order_by('-created_at')
        # posts = Post.objects.order_by('-created_at') 
        comments = Comment.objects.all().order_by('-created_at') 
        serializer = CommentSerializer(comments, many=True) 
        return Response(serializer.data)

class CommentDetail(AuthenticatedAPIView):

    def get(self, request, pk):
        # pdb.set_trace()
        comment = Comment.objects.get(id=pk)
        serializer = CommentSerializer(comment)
        return Response(serializer.data)

    def put(self, request, pk):
        comment = Comment.objects.get(id=pk)
        serializer = CommentSerializer(comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        comment = Comment.objects.get(id=pk)
        comment.delete()
        return Response("Comment successfully deleted!")

class CommentCreate(AuthenticatedAPIView):

    def post(self, request):
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)