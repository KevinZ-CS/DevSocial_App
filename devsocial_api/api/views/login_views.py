from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.serializers import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from api.models import User
from datetime import datetime, timedelta

class UserLogin(APIView):
      
      def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
       
        try:
            user = User.objects.get(email=email)   
            login_user = authenticate(email=user.email, password=password)
            if login_user:
                    refresh = RefreshToken.for_user(login_user)
                    user_data = UserSerializer(login_user).data
                    expires_at = datetime.now() + timedelta(minutes=60)
                    expires_at_timestamp = int(expires_at.timestamp() * 1000)
                    refresh_token_expiration = datetime.utcnow() + timedelta(days=7)
                    refresh_token_expiration_timestamp = int(refresh_token_expiration.timestamp() * 1000)

                    response = {
                        'access_token': str(refresh.access_token),
                        'refresh_token': str(refresh),
                        'expires_at': expires_at_timestamp,
                        'refresh_token_expires_in': refresh_token_expiration_timestamp,
                        'user_id': user_data['id'],
                        'image': user_data['image'],
                        'first_name': user_data['first_name'],
                        'last_name': user_data['last_name']
                    }
                    return Response(response, status=status.HTTP_200_OK)
            response = {'error': 'Invalid email or password'}
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            response = {'error': 'User with email {} does not exist'.format(email)}
            return Response(response, status=status.HTTP_404_NOT_FOUND)
        
