
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import GradientButton from './GradientButton';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, AlertTriangle, Trophy } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  answer: number;
}

interface QuizProps {
  quiz: {
    title: string;
    questions: Question[];
  };
  onComplete: () => void;
}

const ChallengeQuiz: React.FC<QuizProps> = ({ quiz, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(quiz.questions.length).fill(-1));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelection = (value: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = parseInt(value);
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsSubmitted(true);
      setShowResults(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.answer) {
        correctAnswers++;
      }
    });
    return (correctAnswers / quiz.questions.length) * 100;
  };

  const score = calculateScore();
  const isPassed = score >= 70;

  return (
    <Card className="cyber-card overflow-hidden border border-cyber-purple/30">
      <CardHeader className="pb-2 border-b border-cyber-purple/20">
        <CardTitle>{quiz.title}</CardTitle>
        <div className="flex items-center justify-between mt-2">
          <div className="text-sm text-cyber-light/70">
            Question {currentQuestion + 1} of {quiz.questions.length}
          </div>
          <div className="w-48">
            <Progress 
              value={((currentQuestion + 1) / quiz.questions.length) * 100} 
              className="h-2 bg-secondary/50" 
              indicatorClassName="bg-cyber-purple2" 
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="py-6">
        {showResults ? (
          <div className="text-center py-8">
            <div className="mb-6">
              {isPassed ? (
                <div className="mx-auto w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <Trophy className="w-12 h-12 text-green-400" />
                </div>
              ) : (
                <div className="mx-auto w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                  <AlertTriangle className="w-12 h-12 text-red-400" />
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">
                {isPassed ? "Challenge Completed!" : "Challenge Failed"}
              </h3>
              <p className="text-cyber-light/70 mb-4">
                You scored {score.toFixed(0)}% ({Math.round(score * quiz.questions.length / 100)} of {quiz.questions.length} correct)
              </p>
              <Progress 
                value={score} 
                className="h-3 bg-secondary/50 mb-8" 
                indicatorClassName={isPassed ? "bg-green-500" : "bg-red-500"} 
              />
            </div>

            <div className="space-y-6">
              {quiz.questions.map((question, index) => (
                <div key={index} className={`p-4 rounded-lg ${selectedAnswers[index] === question.answer ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                  <div className="flex gap-2">
                    {selectedAnswers[index] === question.answer ? (
                      <CheckCircle2 className="text-green-400 shrink-0 mt-1" />
                    ) : (
                      <XCircle className="text-red-400 shrink-0 mt-1" />
                    )}
                    <div>
                      <p className="font-medium mb-2">{question.question}</p>
                      <div className="grid gap-2 text-sm">
                        <div className={`p-2 rounded ${question.answer === 0 ? 'bg-green-500/20 text-green-400' : selectedAnswers[index] === 0 ? 'bg-red-500/20 text-red-400' : 'bg-secondary/30'}`}>
                          {question.options[0]}
                        </div>
                        <div className={`p-2 rounded ${question.answer === 1 ? 'bg-green-500/20 text-green-400' : selectedAnswers[index] === 1 ? 'bg-red-500/20 text-red-400' : 'bg-secondary/30'}`}>
                          {question.options[1]}
                        </div>
                        <div className={`p-2 rounded ${question.answer === 2 ? 'bg-green-500/20 text-green-400' : selectedAnswers[index] === 2 ? 'bg-red-500/20 text-red-400' : 'bg-secondary/30'}`}>
                          {question.options[2]}
                        </div>
                        <div className={`p-2 rounded ${question.answer === 3 ? 'bg-green-500/20 text-green-400' : selectedAnswers[index] === 3 ? 'bg-red-500/20 text-red-400' : 'bg-secondary/30'}`}>
                          {question.options[3]}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <GradientButton onClick={onComplete} className="mt-8">
              {isPassed ? "Claim Your Points" : "Try Again"}
            </GradientButton>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-semibold mb-6">{quiz.questions[currentQuestion].question}</h3>
            <RadioGroup 
              value={selectedAnswers[currentQuestion].toString()} 
              onValueChange={handleAnswerSelection}
              className="space-y-4"
            >
              {quiz.questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 rounded-lg border border-cyber-purple/20 bg-secondary/20 hover:bg-secondary/30 transition-colors">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} className="text-cyber-purple" />
                  <Label htmlFor={`option-${index}`} className="w-full cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </>
        )}
      </CardContent>

      {!showResults && (
        <CardFooter className="flex justify-between">
          <GradientButton
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            variant="secondary"
          >
            Previous
          </GradientButton>
          <GradientButton
            onClick={handleNextQuestion}
            disabled={selectedAnswers[currentQuestion] === -1}
          >
            {currentQuestion === quiz.questions.length - 1 ? "Submit" : "Next"}
          </GradientButton>
        </CardFooter>
      )}
    </Card>
  );
};

export default ChallengeQuiz;
