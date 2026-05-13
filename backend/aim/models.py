from django.conf import settings
from django.db import models


class AimSettings(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="aim_settings",
    )

    dpi = models.PositiveIntegerField(default=800)
    valorant_sensitivity = models.FloatField(default=0.35)
    mousepad_size_cm = models.PositiveIntegerField(null=True, blank=True)

    training_duration = models.PositiveIntegerField(default=60)
    show_hit_feedback = models.BooleanField(default=True)
    enable_sound_effects = models.BooleanField(default=False)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} aim settings"


class Progression(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="progression",
    )

    level = models.PositiveIntegerField(default=1)
    xp = models.PositiveIntegerField(default=0)
    rank = models.CharField(max_length=50, default="Recruit")

    total_sessions = models.PositiveIntegerField(default=0)
    best_score = models.PositiveIntegerField(default=0)
    current_streak = models.PositiveIntegerField(default=0)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} progression"