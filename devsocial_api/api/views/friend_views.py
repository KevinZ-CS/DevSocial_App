from rest_framework.views import APIView
from rest_framework.response import Response
from api.serializers import FriendSerializer, UserPreviewSerializer
from api.models import Friend, User
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.core.exceptions import ValidationError, ObjectDoesNotExist
import pdb


class AuthenticatedAPIView(APIView):
    authentication_classes = [JWTAuthentication, SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

class FriendsList(AuthenticatedAPIView):

    def get(self, request, pk):
        try:
            friend_ids = Friend.objects.filter(user=pk).values_list('friend', flat=True)
            users = User.objects.filter(id__in=friend_ids)
            serializer = UserPreviewSerializer(users, many=True) 
            return Response(serializer.data)
        except (ObjectDoesNotExist, ValueError):
            return Response({'error': 'Friend not found'}, status=status.HTTP_404_NOT_FOUND)

        # friend_ids = Friend.objects.filter(user=pk).values_list('friend', flat=True)
 
        # users = User.objects.filter(id__in=friend_ids)
        # serializer = UserPreviewSerializer(users, many=True) 
        # return Response(serializer.data)
    


class UpdateFriend(AuthenticatedAPIView):

    def put(self, request, pk, pk_friend):
        try:
            friend = Friend.objects.get(user=pk, friend=pk_friend)
            # pdb.set_trace()
            friend.delete()
            return Response({"message": "unfriend"}, status=status.HTTP_200_OK)
        except Friend.DoesNotExist:
            # pdb.set_trace()
            serializer = FriendSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                new_friend = User.objects.get(id=pk_friend)
                user_preview_serializer = UserPreviewSerializer(new_friend)
                return Response({"message": "friend", "data": user_preview_serializer.data}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

      

  