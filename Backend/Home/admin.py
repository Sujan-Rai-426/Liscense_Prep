from django.contrib import admin

from Home.models import Question, Option, Chapter

# Register your models here.
admin.site.register(Question)
admin.site.register(Option)
admin.site.register(Chapter)
