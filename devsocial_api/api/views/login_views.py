from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.serializers import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from api.models import User
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
                    response = {
                        'access_token': str(refresh.access_token),
                        'user': UserSerializer(login_user).data
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