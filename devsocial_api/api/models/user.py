from django.db import models
import bcrypt

class User(models.Model):
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

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    def save(self, *args, **kwargs):
        if self.password:
            # Hash the password before saving it to the database
            self.password = bcrypt.hashpw(self.password.encode(), bcrypt.gensalt()).decode()
            super(User, self).save(*args, **kwargs)
    
