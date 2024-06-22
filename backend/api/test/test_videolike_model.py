from django.test import TestCase
from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile
from api.models import Channel, Video, VideoLike


class VideoLikeModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="12345")
        self.user2 = User.objects.create_user(username="subuser", password="12345")
        self.channel = Channel.objects.create(
            owner=self.user,
            channel_name="Test Channel",
            description="This is a test channel",
        )
        video_file = SimpleUploadedFile(
            "test_video.mp4", b"file_content", content_type="video/mp4"
        )
        thumbnail_file = SimpleUploadedFile(
            "test_thumbnail.jpg", b"file_content", content_type="image/jpeg"
        )
        self.video = Video.objects.create(
            channel=self.channel,
            title="Test Video",
            description="This is a test video",
            video_file=video_file,
            thumbnail=thumbnail_file,
        )
        self.video_like = VideoLike.objects.create(video=self.video, user=self.user2)

    def test_video_like_str(self):
        self.assertEqual(str(self.video_like), "subuser liked Test Video")

    def test_video_like_creation(self):
        self.assertTrue(isinstance(self.video_like, VideoLike))
        self.assertEqual(self.video_like.user.username, "subuser")
