from django.db import models
import os
import re


# Create your models here.
class Project(models.Model):
    name = models.CharField(max_length=255)
    slug = models.CharField(max_length=255, unique=True, blank=True, null=True)
    tags = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    link = models.URLField( null=True, blank=True)
    image = models.FileField(upload_to='projects/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
     
    def __str__(self):
        return self.name

    def make_slug(self):
        return re.sub('[^A-Za-z0-9 ]+', '', self.name).replace(' ', '-').lower()
    
    def save(self, *args, **kwargs):
        self.slug = self.make_slug()
        super(Project, self).save(*args, **kwargs)
             
    class Meta:
        ordering = ['name']
            
class Experience(models.Model):
    name = models.CharField(max_length=255)
    link = models.URLField( null=True, blank=True)
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    start = models.DateField()
    end = models.DateField()
    
    def __str__(self):
    	return self.name
 
    def __repr__(self):
    	return self.name
    class Meta:
        ordering = ['-start']