from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone

class MarketPrice(models.Model):
    """
    Model to store market prices for various items
    """
    no = models.PositiveIntegerField(unique=True, help_text="Item serial number")
    item = models.CharField(max_length=255, help_text="Item name and description")
    
    # Old prices (can be null)
    old1 = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        null=True, 
        blank=True,
        help_text="First old price"
    )
    old2 = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        null=True, 
        blank=True,
        help_text="Second old price"
    )
    
    # Current prices
    current1 = models.DecimalField(
        max_digits=10, 
        decimal_places=2,
        validators=[MinValueValidator(0)],
        help_text="First current price"
    )
    current2 = models.DecimalField(
        max_digits=10, 
        decimal_places=2,
        validators=[MinValueValidator(0)],
        help_text="Second current price"
    )
    
    # Metadata
    category = models.CharField(
        max_length=50,
        choices=[
            ('RICE', 'Rice'),
            ('DAL', 'Dal/Legumes'),
            ('OIL', 'Oil'),
            ('SPICE', 'Spices'),
            ('FLOUR', 'Flour'),
            ('GRAIN', 'Grain'),
            ('OTHER', 'Other'),
        ],
        default='OTHER',
        help_text="Item category"
    )
    unit = models.CharField(
        max_length=20,
        choices=[
            ('KG', 'Per Kilogram'),
            ('LTR', 'Per Liter'),
            ('PC', 'Per Piece'),
        ],
        default='KG',
        help_text="Unit of measurement"
    )
    is_active = models.BooleanField(default=True, help_text="Whether this item is currently active")
    last_updated = models.DateTimeField(auto_now=True, help_text="Last time this record was updated")
    created_at = models.DateTimeField(auto_now_add=True, help_text="When this record was created")
    
    class Meta:
        ordering = ['no']
        verbose_name = 'Market Price'
        verbose_name_plural = 'Market Prices'
        indexes = [
            models.Index(fields=['no']),
            models.Index(fields=['category']),
            models.Index(fields=['is_active']),
            models.Index(fields=['last_updated']),
        ]
    
    def __str__(self):
        return f"{self.no}. {self.item}"
    
    @property
    def price_difference(self):
        """Calculate difference between current prices"""
        if self.current1 and self.current2:
            return float(self.current1) - float(self.current2)
        return None
    
    @property
    def trend(self):
        """Determine price trend between current1 and current2"""
        if self.current1 is None or self.current2 is None:
            return 'same'
        if self.current1 > self.current2:
            return 'up'
        elif self.current1 < self.current2:
            return 'down'
        return 'same'
    
    def save(self, *args, **kwargs):
        # Auto-increment 'no' if not provided
        if not self.no:
            last = MarketPrice.objects.order_by('-no').first()
            self.no = (last.no + 1) if last else 1
        super().save(*args, **kwargs)
