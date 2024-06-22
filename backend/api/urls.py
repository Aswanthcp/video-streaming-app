from django.urls import path
from api.views.views_channels import getcreateChannel, getUpdateDeleteChannels
from api.views.views_video import getcreateVideos,getUpdateDeleteVideos

urlpatterns = [
    path("channels/", getcreateChannel, name="create_channel"),
    path("channels/<int:id>/", getUpdateDeleteChannels, name="get_channel"),
    
    path("videos/", getcreateVideos, name="create_video"),
    path("videos/<int:id>/", getUpdateDeleteVideos, name="get_video"),
]
