from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from storages.backends.s3boto3 import S3Boto3Storage

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        # pdb.set_trace()
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.is_active = True  
        user.save(using=self._db)
        return user

    # def create_superuser(self, email, password, **extra_fields):
    #     """
    #     Creates and saves a superuser with the given email and password.
    #     """
    #     extra_fields.setdefault('is_staff', True)
    #     extra_fields.setdefault('is_superuser', True)
    #     extra_fields.setdefault('is_active', True)  # set is_active to True by default
    #     return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser):

    first_name = models.CharField(
        blank=False,
        null=False,
    )
    last_name = models.CharField(
        blank=False,
        null=False,
    )
    email = models.EmailField(
        blank=False,
        null=False,
        unique=True,
    )
    password = models.CharField(
        blank=False,
        null=False,
    )
    bio = models.CharField(
        blank=False,
        null=False,
    )
    location = models.CharField(
        blank=False,
        null=False,
    )
    occupation = models.CharField(
        blank=False,
        null=False,
    )
    github_url = models.CharField(
        blank=False,
        null=False,
    )
    linkedin_url = models.CharField(
        blank=False,
        null=False,
    )
    image = models.ImageField(upload_to='images/', blank=False, null=False)
    # image = models.ImageField(upload_to='images/', blank=False, null=False, storage=S3Boto3Storage())

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'bio', 'location', 'occupation', 'github_url', 'linkedin_url', 'image']

    objects = UserManager()

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'
    def __str__(self):
        return f"{self.first_name} {self.last_name}"


  