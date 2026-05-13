from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import AimSettings, Progression
from .serializers import AimSettingsSerializer, ProgressionSerializer


class AimSettingsView(APIView):
    permission_classes = [IsAuthenticated]

    def get_settings(self, user):
        settings, _ = AimSettings.objects.get_or_create(user=user)
        return settings

    def get(self, request):
        aim_settings = self.get_settings(request.user)
        serializer = AimSettingsSerializer(aim_settings)

        return Response(serializer.data)

    def put(self, request):
        aim_settings = self.get_settings(request.user)

        serializer = AimSettingsSerializer(
            aim_settings,
            data=request.data,
            partial=True,
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)


class ProgressionView(APIView):
    permission_classes = [IsAuthenticated]

    def get_progression(self, user):
        progression, _ = Progression.objects.get_or_create(user=user)
        return progression

    def get(self, request):
        progression = self.get_progression(request.user)
        serializer = ProgressionSerializer(progression)

        return Response(serializer.data)