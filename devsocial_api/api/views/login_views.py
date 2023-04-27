from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.serializers import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from api.models import User
from datetime import datetime, timedelta
from django.core.exceptions import ValidationError
import bcrypt
import pdb

class UserLogin(APIView):
      def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
       

        try:
            user = User.objects.get(email=email)   
            # If the password is correct, authenticate the user
            login_user = authenticate(email=user.email, password=password)
                # pdb.set_trace()
            if login_user:
                    # pdb.set_trace()
                    # If the user exists, generate access and refresh tokens
                    refresh = RefreshToken.for_user(login_user)
                    user_data = UserSerializer(login_user).data
                    expires_at = datetime.now() + timedelta(minutes=60)
                    expires_at_timestamp = int(expires_at.timestamp() * 1000)
                    refresh_token_expiration = datetime.utcnow() + timedelta(days=7)
                    refresh_token_expiration_timestamp = int(refresh_token_expiration.timestamp() * 1000)


                    response = {
                        'access_token': str(refresh.access_token),
                        'refresh_token': str(refresh),
                        # 'user': UserSerializer(login_user).data
                        'expires_at': expires_at_timestamp,
                        'refresh_token_expires_in': refresh_token_expiration_timestamp,
                        'user_id': user_data['id'],
                        'image': user_data['image']
                    }
                    return Response(response, status=status.HTTP_200_OK)
            # If the password is incorrect, return an error message
            response = {'error': 'Invalid email or password'}
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            response = {'error': 'User with email {} does not exist'.format(email)}
            return Response(response, status=status.HTTP_404_NOT_FOUND)
        
    #  def post(self, request):
    #     email = request.data.get('email')
    #     password = request.data.get('password')
    #     user = authenticate(username=email, password=password)
    #     if user:
    #         # If the user exists, generate access and refresh tokens
    #         refresh = RefreshToken.for_user(user)
    #         response = {
    #             'access_token': str(refresh.access_token),
    #             'user': UserSerializer(user).data
    #         }
    #         return Response(response, status=status.HTTP_200_OK)
    #     else:
    #         # If the user does not exist, return an error message
    #         response = {'error': 'Invalid email or password'}
    #         return Response(response, status=status.HTTP_401_UNAUTHORIZED)