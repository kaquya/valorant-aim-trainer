from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import (
    AimSettings,
    LevelRun,
    Progression,
    SensitivityAssessment,
    TrainerSession,
    WarmupSession,
)
from .serializers import (
    AimSettingsSerializer,
    LevelRunSerializer,
    ProgressionSerializer,
    SensitivityAssessmentSerializer,
    TrainerSessionSerializer,
    WarmupSessionSerializer,
)


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
    

class TrainerSessionListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        sessions = TrainerSession.objects.filter(user=request.user).order_by("-created_at")[:100]
        serializer = TrainerSessionSerializer(sessions, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TrainerSessionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)

        progression, _ = Progression.objects.get_or_create(user=request.user)
        progression.total_sessions += 1
        progression.best_score = max(progression.best_score, serializer.instance.score)
        progression.xp += max(5, serializer.instance.score // 10)

        if progression.xp >= progression.level * 100:
            progression.xp -= progression.level * 100
            progression.level += 1

        progression.save()

        return Response(serializer.data, status=201)


class SensitivityAssessmentListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        assessments = SensitivityAssessment.objects.filter(user=request.user).order_by("-created_at")[:100]
        serializer = SensitivityAssessmentSerializer(assessments, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = SensitivityAssessmentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)

        progression, _ = Progression.objects.get_or_create(user=request.user)
        progression.xp += 15
        progression.save()

        return Response(serializer.data, status=201)


class WarmupSessionListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        sessions = WarmupSession.objects.filter(user=request.user).order_by("-created_at")[:100]
        serializer = WarmupSessionSerializer(sessions, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = WarmupSessionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)

        progression, _ = Progression.objects.get_or_create(user=request.user)
        progression.total_sessions += 1

        if serializer.instance.completed:
            progression.current_streak += 1
            progression.xp += 25

        progression.save()

        return Response(serializer.data, status=201)


class LevelRunListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        runs = LevelRun.objects.filter(user=request.user).order_by("-created_at")[:100]
        serializer = LevelRunSerializer(runs, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = LevelRunSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)

        progression, _ = Progression.objects.get_or_create(user=request.user)
        progression.total_sessions += 1
        progression.best_score = max(progression.best_score, serializer.instance.score)
        progression.xp += serializer.instance.awarded_xp

        if serializer.instance.awarded_rank:
            progression.rank = serializer.instance.awarded_rank

        progression.save()

        return Response(serializer.data, status=201)