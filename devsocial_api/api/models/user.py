from django.db import models
import bcrypt
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

def generate_error_messages(attribute, messages):
    error_dict = {}
    for key, message in messages.items():
        error_dict[key] = message.format(attribute=attribute)
    return error_dict



blank_null_error_messages = {
    'blank': _('The {attribute} field cannot be be blank.'),
    'null': _('The {attribute} field cannot be null.')
}

password_error_messages = generate_error_messages('password', {
    'invalid': _('Password must be at least 8 characters long, and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.'),
    'mismatch': _('Password and confirm password do not match.')
})

# email_error_messages = generate_error_messages('email', {
#     'invalid': _('Enter a valid email address.'),
#     'unique': _('This email address is already registered.')
# })

def validate_image(value):
    valid_formats = ('jpeg', 'jpg', 'png', 'gif')
    if value.file.content_type not in map(lambda x: f'image/{x}', valid_formats):
        raise ValidationError(f'Unsupported file format. Only {", ".join(valid_formats)} files are supported.')

class User(models.Model):
    first_name = models.CharField(
        blank=False,
        null=False,
        # error_messages=generate_error_messages('first name', blank_null_error_messages)
    )
    last_name = models.CharField(
        blank=False,
        null=False,
        # error_messages=generate_error_messages('last name', blank_null_error_messages)
    )
    email = models.EmailField(
        blank=False,
        null=False,
        unique=True,
        # error_messages=email_error_messages
    )
    password = models.CharField(
        blank=False,
        null=False,
        # validators=[
        #     RegexValidator(
        #         regex=r'^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+]).{8,}$',
        #         message=password_error_messages['invalid']
        #     )
        # ],
        # error_messages=generate_error_messages('password', blank_null_error_messages)
    )
    confirm_password = models.CharField(
        blank=False,
        null=False,
        # error_messages=generate_error_messages('confirm password', blank_null_error_messages)
    )
    bio = models.CharField(
        blank=False,
        null=False,
        # error_messages=generate_error_messages('bio', blank_null_error_messages)
    )
    location = models.CharField(
        blank=False,
        null=False,
        # error_messages=generate_error_messages('location', blank_null_error_messages)
    )
    occupation = models.CharField(
        blank=False,
        null=False,
        # error_messages=generate_error_messages('occupation', blank_null_error_messages)
    )
    github_url = models.CharField(
        blank=False,
        null=False,
        # error_messages=generate_error_messages('Github URL', blank_null_error_messages)
    )
    linkedin_url = models.CharField(
        blank=False,
        null=False,
        # error_messages=generate_error_messages('LinkedIn URL', blank_null_error_messages)
    )
    image = models.ImageField(upload_to='images/', blank=False, null=False,
        validators=[validate_image],
        error_messages=generate_error_messages('image', blank_null_error_messages)
        )

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    def save(self, *args, **kwargs):
        if self.password:
            # Hash the password before saving it to the database
            self.password = bcrypt.hashpw(self.password.encode(), bcrypt.gensalt()).decode()
            super(User, self).save(*args, **kwargs)
    
    def clean(self):
        super().clean()
        if self.password and self.confirm_password and self.password != self.confirm_password:
            raise ValidationError({'confirm_password': password_error_messages['mismatch']})
