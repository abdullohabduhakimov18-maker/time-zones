import React, { useState } from 'react';
import { DISPATCH_QUIZ_QUESTIONS, TRUCK_TYPES, TruckTypeId } from '../data/truckTypesData';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, RotateCcw, Trophy } from 'lucide-react';

interface TruckQuizChallengeProps {
  onSelectTruckFor3D: (id: TruckTypeId) => void;
}

export const TruckQuizChallenge: React.FC<TruckQuizChallengeProps> = ({
  onSelectTruckFor3D
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<TruckTypeId | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const q = DISPATCH_QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (truckId: TruckTypeId) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(truckId);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    setIsAnswerSubmitted(true);
    if (selectedAnswer === q.correctTruckId) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < DISPATCH_QUIZ_QUESTIONS.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
      {/* Quiz Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#02a2f0]">
              LogistMate Practical Challenge
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 font-medium">
              Scenario #{currentIdx + 1} of {DISPATCH_QUIZ_QUESTIONS.length}
            </span>
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">
            Freight Dispatcher: Match Cargo to the Correct Truck
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Score:</span>
          <span className="px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-xs font-bold text-[#02a2f0] tabular-nums">
            {score} / {DISPATCH_QUIZ_QUESTIONS.length}
          </span>
        </div>
      </div>

      {!quizFinished ? (
        <div className="space-y-6">
          {/* Scenario Details Box */}
          <div className="p-4 rounded-xl bg-[#f8fafc] border border-slate-200 space-y-3">
            <p className="text-sm font-bold text-slate-900 leading-relaxed">
              "{q.scenario}"
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-white border border-slate-200/80">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">Weight</span>
                <span className="font-bold text-slate-800">{q.weight}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200/80">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">Dimensions</span>
                <span className="font-bold text-slate-800">{q.dimensions}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200/80">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">Constraint</span>
                <span className="font-bold text-slate-800 truncate block">{q.specialCondition}</span>
              </div>
            </div>
          </div>

          {/* Options Grid */}
          <div>
            <span className="text-xs font-bold text-slate-600 block mb-2.5">
              Which truck type must you assign to this load?
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {TRUCK_TYPES.map(truck => {
                const isSelected = selectedAnswer === truck.id;
                const isCorrect = isAnswerSubmitted && truck.id === q.correctTruckId;
                const isWrongSelected = isAnswerSubmitted && isSelected && truck.id !== q.correctTruckId;

                return (
                  <button
                    key={truck.id}
                    onClick={() => handleSelectOption(truck.id)}
                    disabled={isAnswerSubmitted}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isCorrect
                        ? 'border-emerald-500 bg-emerald-50/70 text-emerald-900 font-bold ring-2 ring-emerald-400/20'
                        : isWrongSelected
                        ? 'border-red-400 bg-red-50/70 text-red-900 font-bold'
                        : isSelected
                        ? 'border-[#02a2f0] bg-blue-50/60 text-[#02a2f0] font-bold ring-2 ring-[#02a2f0]/20'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
                    }`}
                  >
                    <div>
                      <span className="text-xs block font-bold">{truck.name}</span>
                      <span className="text-[10px] text-slate-500 block">{truck.category}</span>
                    </div>

                    {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                    {isWrongSelected && <XCircle className="w-5 h-5 text-red-500 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback & Rationale Explanation */}
          {isAnswerSubmitted && (
            <div
              className={`p-4 rounded-xl border text-xs leading-relaxed space-y-2 animate-in fade-in duration-200 ${
                selectedAnswer === q.correctTruckId
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                  : 'bg-amber-50/70 border-amber-200 text-amber-950'
              }`}
            >
              <div className="font-extrabold flex items-center gap-1.5 text-sm">
                {selectedAnswer === q.correctTruckId ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Correct Choice!
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-red-500" />
                    Incorrect Selection
                  </>
                )}
              </div>
              <p>{q.explanation}</p>
              <div className="pt-2">
                <button
                  onClick={() => onSelectTruckFor3D(q.correctTruckId)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#02a2f0] hover:underline"
                >
                  <span>View the {TRUCK_TYPES.find(t => t.id === q.correctTruckId)?.name} Showcase</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Submit / Next Button */}
          <div className="flex items-center justify-end gap-3 pt-2">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all shadow-xs ${
                  selectedAnswer
                    ? 'bg-[#02a2f0] hover:bg-[#0091d9]'
                    : 'bg-slate-300 cursor-not-allowed'
                }`}
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#14516e] hover:bg-[#0e3b52] text-white transition-colors shadow-xs"
              >
                <span>{currentIdx + 1 === DISPATCH_QUIZ_QUESTIONS.length ? 'See Final Score' : 'Next Scenario'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Completed Screen */
        <div className="py-8 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-500 flex items-center justify-center mx-auto shadow-xs">
            <Trophy className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-xl font-extrabold text-slate-900">
              Challenge Completed!
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              You scored <strong className="text-slate-900 text-sm">{score}</strong> out of <strong className="text-slate-900 text-sm">{DISPATCH_QUIZ_QUESTIONS.length}</strong> correct.
            </p>
          </div>
          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#02a2f0] hover:bg-[#0091d9] text-white transition-colors shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Dispatch Challenge</span>
          </button>
        </div>
      )}
    </div>
  );
};
