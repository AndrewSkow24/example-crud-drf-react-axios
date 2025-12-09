from django.urls import path
from .apps import ProductsConfig
from rest_framework.routers import DefaultRouter

app_name = ProductsConfig.name
from . import views

router = DefaultRouter()
router.register("products", views.ProductViewSet, "products")

urlpatterns = [] + router.urls
