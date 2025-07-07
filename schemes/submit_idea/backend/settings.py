
INSTALLED_APPS = [
    ...
    'corsheaders',  # if frontend is separate
    'schemes.submit_idea','rest_framework',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    ...
]

CORS_ALLOW_ALL_ORIGINS = True  # for testing only