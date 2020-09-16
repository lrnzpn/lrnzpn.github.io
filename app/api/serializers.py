from rest_framework import serializers
from api.models import *

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
        
class ExperienceSerializer(serializers.ModelSerializer):
    company = serializers.StringRelatedField()
    
    class Meta:
        model = Experience
        fields = ['id', 'company', 'name', 'description','start','end']
    
class CompanySerializer(serializers.ModelSerializer):
    experiences = ExperienceSerializer(many=True)
    
    class Meta:
        model = Company
        fields = ['id', 'name', 'image', 'description', 'link', 'experiences',]
