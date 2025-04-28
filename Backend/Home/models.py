from django.db import models

# Create your models here.
from django.db import models

# Create your models here.

# Questions model
class Question(models.Model):
    question = models.TextField()
    def __str__(self):
        return self.question 


# Options Model
class Option(models.Model):
    
    #link options to any question  link many to one relationship(i.e many options belong to single question)
    question = models.ForeignKey(Question, related_name='options', on_delete=models.CASCADE) 
    
    option = models.CharField(max_length=500)
    is_correct = models.BooleanField(default=False)
    def __str__(self):
        return self.option


