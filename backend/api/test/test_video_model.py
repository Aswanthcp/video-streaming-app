from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework import status
from api.models import Video, Channel


class VideoModelTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="12345")
        self.channel = Channel.objects.create(
            owner=self.user,
            channel_name="Test Channel",
            description="This is a test channel",
        )

        self.video_file = SimpleUploadedFile(
            "test_video.mp4", b"file_content", content_type="video/mp4"
        )
        self.thumbnail_file = SimpleUploadedFile(
            "test_thumbnail.jpg", b"file_content", content_type="image/jpeg"
        )

        self.video_data = {
            "channel": self.channel.id,
            "title": "Test Video",
            "description": "This is a test video",
            "video_file": self.video_file,
            "thumbnail": self.thumbnail_file,
        }

        self.video = Video.objects.create(
            channel=self.channel,
            title="Test Video",
            description="This is a test video",
            video_file=self.video_file,
            thumbnail=self.thumbnail_file,
        )

        self.client.force_authenticate(user=self.user)

    def tearDown(self):
        self.video_file.close()
        self.thumbnail_file.close()
        self.channel.delete()
        self.user.delete()

    def test_get_video(self):
        response = self.client.get(f"/api/videos/{self.video.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], "Test Video")

    def test_update_video(self):
        updated_data = {
            "channel": self.channel.id,
            "title": "Updated Video",
            "description": "Updated description",
        }

        response = self.client.put(
            f"/api/videos/{self.video.id}/", updated_data, format="json"
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(response.data["title"], "Updated Video")

        updated_video = Video.objects.get(id=self.video.id)

        self.assertEqual(updated_video.thumbnail, self.video.thumbnail)

    def test_delete_video(self):
        response = self.client.delete(f"/api/videos/{self.video.id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Video.objects.filter(id=self.video.id).exists())

    def test_list_videos(self):
        video_file2 = SimpleUploadedFile(
            "test_video2.mp4", b"file_content2", content_type="video/mp4"
        )
        thumbnail_file2 = SimpleUploadedFile(
            "test_thumbnail2.jpg", b"file_content2", content_type="image/jpeg"
        )

        video2 = Video.objects.create(
            channel=self.channel,
            title="Second Video",
            description="This is the second test video",
            video_file=video_file2,
            thumbnail=thumbnail_file2,
        )

        video_file3 = SimpleUploadedFile(
            "test_video3.mp4", b"file_content3", content_type="video/mp4"
        )
        thumbnail_file3 = SimpleUploadedFile(
            "test_thumbnail3.jpg", b"file_content3", content_type="image/jpeg"
        )

        video3 = Video.objects.create(
            channel=self.channel,
            title="Third Video",
            description="This is the third test video",
            video_file=video_file3,
            thumbnail=thumbnail_file3,
        )

        response = self.client.get("/api/videos/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)
        self.assertEqual(response.data[0]["title"], "Test Video")
        self.assertEqual(response.data[1]["title"], "Second Video")
        self.assertEqual(response.data[2]["title"], "Third Video")

        # Close the files after use
        video_file2.close()
        thumbnail_file2.close()
        video_file3.close()
        thumbnail_file3.close()
