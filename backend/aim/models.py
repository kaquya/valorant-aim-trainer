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
    

class TrainerSession(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="trainer_sessions",
    )

    mode = models.CharField(max_length=50)
    difficulty = models.CharField(max_length=50)

    hits = models.PositiveIntegerField(default=0)
    misses = models.PositiveIntegerField(default=0)
    total_clicks = models.PositiveIntegerField(default=0)
    accuracy = models.PositiveIntegerField(default=0)
    shots_per_minute = models.PositiveIntegerField(default=0)
    score = models.PositiveIntegerField(default=0)

    sensitivity = models.FloatField(default=0.35)
    edpi = models.PositiveIntegerField(default=280)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} trainer session {self.mode}"


class SensitivityAssessment(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="sensitivity_assessments",
    )

    dpi = models.PositiveIntegerField(default=800)
    sensitivity = models.FloatField(default=0.35)
    edpi = models.PositiveIntegerField(default=280)

    hits = models.PositiveIntegerField(default=0)
    misses = models.PositiveIntegerField(default=0)
    total_shots = models.PositiveIntegerField(default=0)
    accuracy = models.PositiveIntegerField(default=0)

    overflicks = models.PositiveIntegerField(default=0)
    underflicks = models.PositiveIntegerField(default=0)

    recommendation = models.CharField(max_length=20, default="keep")
    recommended_sensitivity = models.FloatField(default=0.35)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} sensitivity assessment"


class WarmupSession(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="warmup_sessions",
    )

    duration_seconds = models.PositiveIntegerField(default=300)
    completed = models.BooleanField(default=False)
    score = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} warmup session"


class LevelRun(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="level_runs",
    )

    level_id = models.CharField(max_length=50)
    level_name = models.CharField(max_length=100)

    score = models.PositiveIntegerField(default=0)
    accuracy = models.PositiveIntegerField(default=0)
    passed = models.BooleanField(default=False)

    awarded_rank = models.CharField(max_length=50, blank=True, default="")
    awarded_xp = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} level run {self.level_id}"