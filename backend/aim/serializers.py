from rest_framework import serializers

from .models import (
    AimSettings,
    LevelRun,
    Progression,
    SensitivityAssessment,
    TrainerSession,
    WarmupSession,
)


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


class TrainerSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainerSession
        fields = [
            "id",
            "mode",
            "difficulty",
            "hits",
            "misses",
            "total_clicks",
            "accuracy",
            "shots_per_minute",
            "score",
            "sensitivity",
            "edpi",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]


class SensitivityAssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = SensitivityAssessment
        fields = [
            "id",
            "dpi",
            "sensitivity",
            "edpi",
            "hits",
            "misses",
            "total_shots",
            "accuracy",
            "overflicks",
            "underflicks",
            "recommendation",
            "recommended_sensitivity",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]


class WarmupSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = WarmupSession
        fields = [
            "id",
            "duration_seconds",
            "completed",
            "score",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]


class LevelRunSerializer(serializers.ModelSerializer):
    class Meta:
        model = LevelRun
        fields = [
            "id",
            "level_id",
            "level_name",
            "score",
            "accuracy",
            "passed",
            "awarded_rank",
            "awarded_xp",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]