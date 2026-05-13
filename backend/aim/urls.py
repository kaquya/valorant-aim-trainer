from django.urls import path

from .views import AimSettingsView, ProgressionView

urlpatterns = [
    path("settings/", AimSettingsView.as_view(), name="aim-settings"),
    path("progression/", ProgressionView.as_view(), name="aim-progression"),
]