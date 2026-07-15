import type { Question } from '../types';

interface Props {
  question: Question;
  questionNumber: number;
  questionTotal: number;
  onAnswer: (answerText: string) => void;
}

export default function QuizQuestion({ question, questionNumber, questionTotal, onAnswer }: Props) {
  return (
    <div className="quiz-phase">
      <div className="progress-dots">
        {Array.from({ length: questionTotal }, (_, i) => (
          <div
            key={i}
            className="progress-dot"
            style={{ background: i < questionNumber - 1 ? '#6b7d4f' : i === questionNumber - 1 ? '#c4703f' : '#e4dcc8' }}
          />
        ))}
      </div>
      <div className="question-eyebrow">Question {questionNumber} of {questionTotal}</div>
      <div className="question-text">{question.text}</div>
      <div className="question-options">
        {question.options.map((opt) => (
          <button key={opt} className="question-option" onClick={() => onAnswer(opt)}>{opt}</button>
        ))}
      </div>
    </div>
  );
}
