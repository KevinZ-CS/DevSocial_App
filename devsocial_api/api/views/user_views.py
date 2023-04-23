from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.serializers import UserSerializer
from api.models import User
from django.core.exceptions import ValidationError

class UserDetail(APIView):
    def get(self, request, pk):
        user = User.objects.get(id=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, pk):
        user = User.objects.get(id=pk)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user = User.objects.get(id=pk)
        user.delete()
        return Response("User successfully deleted!")

class UserCreate(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class UserCreate(APIView):
#     def post(self, request):
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)

#         # If the serializer is not valid, try to create a User instance and validate it
#         user = User(**request.data)
#         try:
#             user.full_clean()
#         except ValidationError as e:
#             # Extract the error messages from the validation error and return them as the response
#             return Response(e.message_dict, status=status.HTTP_400_BAD_REQUEST)

#         # If the user instance is valid, return the serializer errors as the response
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)