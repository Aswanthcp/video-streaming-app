from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from api.serializers import VideoSerializer
from api.models import Video


@api_view(["POST", "GET"])
def getcreateVideos(request):
    if request.method == "POST":
        serializer = VideoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "GET":
        videos = Video.objects.all()
        serializer = VideoSerializer(videos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET", "PUT", "DELETE"])
def getUpdateDeleteVideos(request, id):
    video = get_object_or_404(Video, id=id)

    if request.method == "GET":
        serializer = VideoSerializer(video)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == "PUT":
        data = request.data.copy()

        if "thumbnail" not in request.FILES:
            data.pop(
                "thumbnail", None
            )  

        serializer = VideoSerializer(video, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        video.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
