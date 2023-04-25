from django.contrib.auth.backends import BaseBackend
from api.models import User
import bcrypt
import pdb

class EmailBackend(BaseBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
    
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return None
        
     
        if bcrypt.checkpw(password.encode(), user.password.encode()):
            # pdb.set_trace()
            return user

        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
