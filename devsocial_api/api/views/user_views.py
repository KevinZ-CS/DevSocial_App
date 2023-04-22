from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from serializers import UserSerializer
from models import User

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
