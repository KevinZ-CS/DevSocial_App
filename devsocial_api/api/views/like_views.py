from rest_framework.views import APIView
from rest_framework.response import Response
from api.serializers import LikeSerializer
from api.models import Like
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication

class AuthenticatedAPIView(APIView):
    authentication_classes = [JWTAuthentication, SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

class UpdateLike(AuthenticatedAPIView):

    def put(self, request, pk, user_pk):
        try:
            like = Like.objects.get(user=user_pk, post=pk)
            like.delete()
            return Response({"message": "unlike"}, status=status.HTTP_200_OK)
        except Like.DoesNotExist:
            serializer = LikeSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "like", "data": serializer.data}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

      
        


  
        

