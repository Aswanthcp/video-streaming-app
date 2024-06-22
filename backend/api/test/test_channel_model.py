from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework import status
from api.models import Channel


class ChannelAPITestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="12345")
        self.channel = Channel.objects.create(
            owner=self.user,
            channel_name="Test Channel",
            description="This is a test channel",
        )
        self.client.force_authenticate(user=self.user)

    def tearDown(self):
        self.channel.delete()
        self.user.delete()

    def test_get_channel(self):
        response = self.client.get(f"/api/channels/{self.channel.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["channel_name"], "Test Channel")

    def test_update_channel(self):
        data = {
            "owner": self.user.id,
            "channel_name": "Updated Channel",
            "description": "This is an updated description",
        }
        response = self.client.put(f"/api/channels/{self.channel.id}/", data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["channel_name"], "Updated Channel")

    def test_delete_channel(self):
        response = self.client.delete(f"/api/channels/{self.channel.id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Channel.objects.filter(id=self.channel.id).exists())
