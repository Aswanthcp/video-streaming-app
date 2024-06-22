from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from api.serializers import ChannelSerializer
from api.models import Channel


@api_view(["POST", "GET"])
def getcreateChannel(request):
    if request.method == "POST":
        serializer = ChannelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "GET":
        channels = Channel.objects.all()
        serializer = ChannelSerializer(channels, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET", "PUT", "DELETE"])
def getUpdateDeleteChannels(request, id):
    channel = get_object_or_404(Channel, id=id)

    if request.method == "GET":
        serializer = ChannelSerializer(channel)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == "PUT":
        serializer = ChannelSerializer(channel, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        channel.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
