from rest_framework.views import APIView
from rest_framework.response import Response
from api.serializers import LikeSerializer
from api.models import Like
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
import pdb


class AuthenticatedAPIView(APIView):
    authentication_classes = [JWTAuthentication, SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]


# class CommentList(AuthenticatedAPIView):

#     def get(self, request):
#         # posts = Post.objects.select_related('user_id').order_by('-created_at') 
#         # posts = Post.objects.prefetch_related('post_id', 'user_id').order_by('-created_at')
#         # posts = Post.objects.order_by('-created_at') 
#         comments = Comment.objects.all().order_by('-created_at') 
#         serializer = CommentSerializer(comments, many=True) 
#         return Response(serializer.data)

class UpdateLike(AuthenticatedAPIView):

    # def put(self, request, pk, user_pk):
    #     like = Like.objects.get(user=user_pk)            
    #     if(like):
    #         like.delete()
    #         return Response({"message": "Unliked"}, status=status.HTTP_200_OK)
    #     else:
    #         serializer = LikeSerializer(data=request.data)
    #         if serializer.is_valid():
    #             serializer.save()
    #             return Response(serializer.data, status=status.HTTP_201_CREATED)
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def put(self, request, pk, user_pk):
        try:
            like = Like.objects.get(user=user_pk, post=pk)
            # pdb.set_trace()
            like.delete()
            return Response({"message": "unlike"}, status=status.HTTP_200_OK)
        except Like.DoesNotExist:
            # pdb.set_trace()
            serializer = LikeSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "like", "data": serializer.data}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

      
        

        # like = Like.objects.get(id=pk)
        # serializer = LikeSerializer(like, data=request.data)
        # if serializer.is_valid():
        #     serializer.save()
        #     return Response(serializer.data)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  
        

