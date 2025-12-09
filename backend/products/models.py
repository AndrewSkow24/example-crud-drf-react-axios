from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=100, verbose_name="Наименование")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="цена")
    description = models.TextField(verbose_name="Описание")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
    updated_at = models.DateTimeField(
        auto_now=True, verbose_name="Последнее обновление"
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Продукт"
        verbose_name_plural = "Продукты"
        ordering = [
            "-updated_at",
        ]
