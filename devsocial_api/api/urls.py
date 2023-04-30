"""
URL configuration for devsocial_api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from api.views import UserDetail, UserCreate, UserLogin, PostList, PostDetail, PostCreate, CommentCreate, CommentDetail, UpdateLike, UpdateFriend, FriendsList
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # path('users/<int:pk>/', UserDetail.as_view(), name='user-detail'),

    path('users/<int:pk>/', include([
        path('', UserDetail.as_view(), name='user-detail'),    
        path('friends/', FriendsList.as_view(), name='friend-update'),
        path('friends/<int:pk_friend>/update/', UpdateFriend.as_view(), name='friend-update'),
    ])),

    path('users/', UserCreate.as_view(), name='user-create'),


    path('login/', UserLogin.as_view(), name='user-login'),
    path('posts/', PostList.as_view(), name='post-list'),
    path('posts/create/', PostCreate.as_view(), name='post-create'),
    # path('post/<int:pk>/', PostDetail.as_view(), name='post-detail'),
    path('posts/<int:pk>/', include([
        path('', PostDetail.as_view(), name='post-detail'), #the empty string '' represents the base path of the nested URLs
        # path('comments/', CommentList.as_view(), name='comment-list'),
        path('comment/create/', CommentCreate.as_view(), name='comment-create'),
        path('comment/<int:user_pk>/<int:comment_pk>/delete/', CommentDetail.as_view(), name='comment-detail'),
        path('like/<int:user_pk>/update/', UpdateLike.as_view(), name='update-like'),
    ])),



    # path('comment/', CommentCreate.as_view(), name='comment-create'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)