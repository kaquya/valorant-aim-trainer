from django.urls import path

from .views import (
    AimSettingsView,
    LevelRunListCreateView,
    ProgressionView,
    SensitivityAssessmentListCreateView,
    TrainerSessionListCreateView,
    WarmupSessionListCreateView,
)

urlpatterns = [
    path("settings/", AimSettingsView.as_view(), name="aim-settings"),
    path("progression/", ProgressionView.as_view(), name="aim-progression"),
    path("trainer-sessions/", TrainerSessionListCreateView.as_view(), name="trainer-sessions"),
    path("sensitivity-assessments/", SensitivityAssessmentListCreateView.as_view(), name="sensitivity-assessments"),
    path("warmup-sessions/", WarmupSessionListCreateView.as_view(), name="warmup-sessions"),
    path("level-runs/", LevelRunListCreateView.as_view(), name="level-runs"),
]