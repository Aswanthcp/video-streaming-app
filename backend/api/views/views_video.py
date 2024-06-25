from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.serializers import VideoSerializer
from api.models import Video
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny


class VideoListCreate(APIView):
    def get_permissions(self):
        if self.request.method == "POST":
            self.permission_classes = [IsAuthenticated]
        elif self.request.method == "GET":
            self.permission_classes = [AllowAny]
        return super().get_permissions()

    def post(self, request):
        serializer = VideoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        videos = Video.objects.all()
        serializer = VideoSerializer(videos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class VideoDetiails(APIView):
    def get_permissions(self):
        if self.request.method == "PUT" or self.request.method == "DELETE":
            self.permission_classes = [IsAuthenticated]
        elif self.request.method == "GET":
            self.permission_classes = [AllowAny]
        return super().get_permissions()

    def get(self, request, id):
        videos = get_object_or_404(Video, id=id)
        serializer = VideoSerializer(videos, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, id):
        videos = get_object_or_404(Video, id=id)
        serializer = VideoSerializer(videos, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        videos = get_object_or_404(Video, id=id)
        videos.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
