from django.db import models
from django.contrib.auth.models import User





class Channel(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    channel_name = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self) -> str:
        return self.channel_name


class Video(models.Model):
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    durations = models.CharField(max_length=10,default="10:12")
    description = models.TextField()
    video_file = models.FileField(upload_to="videos/")
    thumbnail = models.ImageField(upload_to="thumbnails/", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    views = models.IntegerField(default=0)

    def __str__(self):
        return self.title


class Subscriber(models.Model):
    parent_channel = models.OneToOneField(
        Channel, on_delete=models.CASCADE, related_name="subscribers"
    )
    sub_channel = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="subscriptions"
    )

    def __str__(self):
        return f"{self.sub_channel.username} subscribed to {self.parent_channel.channel_name}"


class VideoLike(models.Model):
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    liked_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} liked {self.video.title}"
