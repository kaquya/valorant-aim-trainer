from rest_framework import serializers

from .models import AimSettings, Progression


class AimSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AimSettings
        fields = [
            "dpi",
            "valorant_sensitivity",
            "mousepad_size_cm",
            "training_duration",
            "show_hit_feedback",
            "enable_sound_effects",
            "updated_at",
        ]


class ProgressionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Progression
        fields = [
            "level",
            "xp",
            "rank",
            "total_sessions",
            "best_score",
            "current_streak",
            "updated_at",
        ]