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
from django.urls import path
from api.views import UserDetail, UserCreate, UserLogin, PostList, PostDetail, PostCreate
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('users/<int:pk>/', UserDetail.as_view(), name='user-detail'),
    path('users/', UserCreate.as_view(), name='user-create'),
    path('login/', UserLogin.as_view(), name='user-login'),
    path('posts/', PostList.as_view(), name='post-list'),
    path('post/<int:pk>/', PostDetail.as_view(), name='post-detail'),
    path('post/', PostCreate.as_view(), name='post-create'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)