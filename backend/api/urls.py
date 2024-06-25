from django.urls import path
from api.views.views_channels import getcreateChannel, getUpdateDeleteChannels
from api.views.views_video import VideoListCreate, VideoDetiails
from api.views.views_users import getUpdateUser

urlpatterns = [
    path("user/<int:id>/", getUpdateUser, name="get_usersbyId"),
    path("channels/", getcreateChannel, name="create_channel"),
    path("channels/<int:id>/", getUpdateDeleteChannels, name="get_channel"),
    path("videos/", VideoListCreate.as_view(), name="getcreateVideos"),
    path("videos/<int:id>/", VideoDetiails.as_view(), name="getcreateVideos"),
]
