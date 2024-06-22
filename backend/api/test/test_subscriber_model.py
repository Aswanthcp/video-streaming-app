from django.test import TestCase
from django.contrib.auth.models import User
from api.models import Channel, Subscriber


class SubscriberModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="12345")
        self.user2 = User.objects.create_user(username="subuser", password="12345")
        self.channel = Channel.objects.create(
            owner=self.user,
            channel_name="Test Channel",
            description="This is a test channel",
        )
        self.subscriber = Subscriber.objects.create(
            parent_channel=self.channel, sub_channel=self.user2
        )

    def test_subscriber_str(self):
        self.assertEqual(str(self.subscriber), "subuser subscribed to Test Channel")

    def test_subscriber_creation(self):
        self.assertTrue(isinstance(self.subscriber, Subscriber))
        self.assertEqual(self.subscriber.sub_channel.username, "subuser")
