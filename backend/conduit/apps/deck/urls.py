from django.conf.urls import include, url

from rest_framework.routers import DefaultRouter

from .views import (
    DeckViewSet
)

router = DefaultRouter(trailing_slash=False)
router.register(r'decks', DeckViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]
