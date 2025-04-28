from rest_framework import serializers
from .models import Question, Option, Chapter

# Serializer for the Option model
class Option_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ['id', 'option']

# Serializer for the Question model
class Question_Serializer(serializers.ModelSerializer):
    options = Option_Serializer(many=True)  # remove read_only=True to allow POST
    correct_answer = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = ['id', 'question', 'options', 'correct_answer']

    def get_correct_answer(self, obj):
        return [opt.option for opt in obj.options.filter(is_correct=True)]

    # Create method to handle nested option creation
    def create(self, validated_data):
        options_data = validated_data.pop('options')
        correct_answers = self.initial_data.get('correct_answer', [])
        question = Question.objects.create(**validated_data)

        for opt in options_data:
            is_correct = opt['option'] in correct_answers
            Option.objects.create(question=question, option=opt['option'], is_correct=is_correct)

        return question


# Chapter Serializer
class Chapter_Serializer(serializers.ModelSerializer):
    questions = Question_Serializer(many=True)  # Nested questions for each chapter
    
    class Meta:
        model = Chapter
        fields = '__all__'



