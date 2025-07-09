from rest_framework import serializers
from .models import NGO, AreaOfWork

class AreaOfWorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = AreaOfWork
        fields = ['id', 'name']

class NGOSerializer(serializers.ModelSerializer):
    areas_of_work = serializers.PrimaryKeyRelatedField(
        queryset='AreaOfWork.objects.all()',  # type: ignore
        many=True
    )

    class Meta:
        model = NGO
        fields = '__all__'
