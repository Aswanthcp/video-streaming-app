from rest_framework import serializers
from api.models import Channel, Video

from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
      
        user = User.objects.create_user(
            username=validated_data["username"], password=validated_data["password"]
        )
        return user


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = ["id", "owner", "channel_name", "description"]
        extra_kwargs = {"owner": {"read_only": True}}


class VideoSerializer(serializers.ModelSerializer):
    channel = ChannelSerializer()

    class Meta:
        model = Video
        fields = [
            "id",
            "channel",
            "title",
            "description",
            "video_file",
            "thumbnail",
            "durations",
            "views",
        ]
        read_only_fields = ["id", "created_at", "channel"]

    def update(self, instance, validated_data):

        instance.title = validated_data.get("title", instance.title)
        instance.description = validated_data.get("description", instance.description)

        if "thumbnail" in validated_data:
            instance.thumbnail = validated_data["thumbnail"]

        instance.save()
        return instance
