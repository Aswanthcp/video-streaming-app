from rest_framework import serializers
from api.models import Channel, Video


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = "__all__"


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ["id", "channel", "title", "description", "video_file", "thumbnail"]
        read_only_fields = ["id", "created_at", "views"]

    def update(self, instance, validated_data):

        instance.title = validated_data.get("title", instance.title)
        instance.description = validated_data.get("description", instance.description)

        if "thumbnail" in validated_data:
            instance.thumbnail = validated_data["thumbnail"]

        instance.save()
        return instance
