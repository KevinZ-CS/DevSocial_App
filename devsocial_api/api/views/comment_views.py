from rest_framework.views import APIView
from rest_framework.response import Response
from api.serializers import CommentSerializer
from api.models import Comment
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication

class AuthenticatedAPIView(APIView):
    authentication_classes = [JWTAuthentication, SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

class CommentList(AuthenticatedAPIView):

    def get(self, request):
        comments = Comment.objects.all().order_by('-created_at') 
        serializer = CommentSerializer(comments, many=True) 
        return Response(serializer.data)

class CommentDetail(AuthenticatedAPIView):

    def delete(self, request, pk, user_pk, comment_pk):
        comment = Comment.objects.get(id=comment_pk)
        if comment.user_id == int(user_pk):
            comment.delete()
            return Response({"message": "Comment successfully deleted!"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "You are not authorized to delete this comment."}, status=status.HTTP_403_FORBIDDEN)
        

class CommentCreate(AuthenticatedAPIView):

    def post(self, request, pk):
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)