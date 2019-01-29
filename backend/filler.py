import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE','conduit.settings')

import django
django.setup()

from conduit.apps.articles.models import Article, Comment, Tag
from conduit.apps.profiles.models import Profile
from conduit.apps.authentication.models import User
from conduit.apps.card.models import Card
from conduit.apps.deck.models import Deck
from conduit.apps.player.models import Player
from faker import Faker

fake = Faker()

def callDummies(N):
    for i in range(N):
        author = Player.objects.get_or_create(user__username='Antsel')[0]
        fake_slug = fake.slug()
        fake_name = fake.word()
        fake_image="https://vignette.wikia.nocookie.net/yugiohenespanol/images/0/0b/Foto_drag%C3%B3n_blanco_de_ojos_azules.jpg/revision/latest/scale-to-width-down/350?cb=20120203053029&path-prefix=es"
        deck = Deck.objects.get_or_create(slug=fake_slug, player=author, image=fake_image, name=fake_name)[0]
        for i in range(10):
            fake_name = fake.word()
            fake_slug = fake.slug()
            fake_text = fake.text()
            fake_image="https://vignette.wikia.nocookie.net/yugiohenespanol/images/0/0b/Foto_drag%C3%B3n_blanco_de_ojos_azules.jpg/revision/latest/scale-to-width-down/350?cb=20120203053029&path-prefix=es"

            card = Card.objects.get_or_create(card=fake_name, slug=fake_slug,image=fake_image, text=fake_text)[0]
            deck.cards.add(card)
        


if __name__ == '__main__':
    print("Filling random data")
    callDummies(7)
    print("Filling done ")