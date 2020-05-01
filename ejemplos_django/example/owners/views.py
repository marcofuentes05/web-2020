from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework.response import Response
# Create your views here.
from rest_framework import viewsets
from owners.models import Owner
from owners.serializers import OwnerSerializer

class OwnerViewSet(viewsets.ModelViewSet):
    queryset = Owner.objects.all()
    serializer_class = OwnerSerializer

    def perform_create(self, serializer):
        owner = serializer.save()


    @action(detail = True, methods = ['post'])
    def remove(self, request, pk = None):
        owner = self.get_object()
        response = owner.delete()
        return Response({
            'status' : str(response)
        })
