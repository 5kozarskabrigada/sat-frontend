// src/components/Exam/SatQuestionLayout.tsx
import React from 'react';
import type {
  QuestionResponse, TestSectionInfo } from '../../types/exam';

interface SatQuestionLayoutProps {
  testTitle: string;
  sections: TestSectionInfo[];
  currentSectionIndex: number;
  currentQuestion: QuestionResponse;
  currentQuestionIndex: number;
  currentSectionQuestions: QuestionResponse[];
  answers: Record<string, string | null>;
  flags: Record<string, boolean>;
  timer: { minutes: number; seconds: number };
  onSelectQuestion: (sectionIndex: number, indexInSection: number) => void;
  onAnswer: (questionId: string, value: string | null) => void;
  onToggleFlag: (questionId: string) => void;
  onNext: () => void;
  onPrev: () => void;
  onAutosave: () => Promise<void> | void;
  onSubmit: () => Promise<void> | void;
  submitting: boolean;
  status: {
    isWindowFocused: boolean;
    isDocumentVisible: boolean;
    isFullscreen: boolean;
  };
}

const SatQuestionLayout: React.FC<SatQuestionLayoutProps> = ({
  testTitle,
  sections,
  currentSectionIndex,
  currentQuestion,
  currentQuestionIndex,
  currentSectionQuestions,
  answers,
  flags,
  timer,
  onSelectQuestion,
  onAnswer,
  onToggleFlag,
  onNext,
  onPrev,
  onAutosave,
  onSubmit,
  submitting,
  status,
}) => {
  const { minutes, seconds } = timer;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;

  const answerValue = answers[currentQuestion.id] ?? null;
  const isFlagged = flags[currentQuestion.id] ?? false;

  const section = sections[currentSectionIndex];

  return (
    <div className="sat-shell">
      {/* Top bar: logo, section, timer, controls */}
      <header className="sat-topbar">
        <div className="sat-topbar-left">
          <div className="sat-logo-pill">SAT</div>
          <div className="sat-topbar-text">
            <div className="sat-topbar-title">{testTitle}</div>
            <div className="sat-topbar-section">
              {section?.name} · Section {section?.index + 1}
            </div>
          </div>
        </div>
        <div className="sat-topbar-right">
          <div className="sat-status-indicators">
            {!status.isFullscreen && (
              <span className="sat-status-warning">Exit Full Screen</span>
            )}
            {!status.isWindowFocused && (
              <span className="sat-status-warning">Window not active</span>
            )}
            {!status.isDocumentVisible && (
              <span className="sat-status-warning">Tab not visible</span>
            )}
          </div>
          <div className="sat-timer-chip">
            <span className="sat-timer-label">Time Remaining</span>
            <span className="sat-timer-value">{formattedTime}</span>
          </div>
          <button
            className={`sat-flag-toggle ${isFlagged ? 'sat-flag-on' : ''}`}
            type="button"
            onClick={() => onToggleFlag(currentQuestion.id)}
          >
            {isFlagged ? 'Clear Flag' : 'Flag for Review'}
          </button>
          <button
            className="sat-save-link"
            type="button"
            onClick={() => onAutosave()}
          >
            Save
          </button>
          <button
            className="sat-end-test-btn"
            type="button"
            onClick={() => onSubmit()}
            disabled={submitting}
          >
            {submitting ? 'Ending…' : 'End Test'}
          </button>
        </div>
      </header>

      {/* Body layout */}
      <div className="sat-body">
        {/* Left: questions palette */}
        <aside className="sat-palette">
          <div className="sat-palette-header">
            <div>Question</div>
            <div className="sat-palette-legend">
              <span className="sat-legend-dot sat-legend-answered" /> Answered
              <span className="sat-legend-dot sat-legend-flagged" /> Flagged
              <span className="sat-legend-dot sat-legend-current" /> Current
            </div>
          </div>
          <div className="sat-palette-grid">
            {currentSectionQuestions.map((q, index) => {
              const answered = !!answers[q.id];
              const flagged = flags[q.id];
              const isCurrent = index === currentQuestionIndex;

              const classes = [
                'sat-palette-item',
                answered ? 'is-answered' : '',
                flagged ? 'is-flagged' : '',
                isCurrent ? 'is-current' : '',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <button
                  key={q.id}
                  type="button"
                  className={classes}
                  onClick={() =>
                    onSelectQuestion(currentSectionIndex, index)
                  }
                >
                  {q.questionNumber}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Center: passage + question */}
        <main className="sat-main">
          {currentQuestion.passageText && (
            <section className="sat-passage">
              <div className="sat-passage-label">Passage</div>
              <div className="sat-passage-box">
                {currentQuestion.passageText}
              </div>
            </section>
          )}

          <section className="sat-question-area">
            <div className="sat-question-header">
              <div className="sat-question-number">
                Question {currentQuestion.questionNumber}
              </div>
              {isFlagged && <div className="sat-flag-indicator">Flagged</div>}
            </div>
            <div className="sat-question-text">
              {currentQuestion.questionText}
            </div>

            {/* MC options */}
            {currentQuestion.options && currentQuestion.options.length > 0 && (
              <div className="sat-options">
                {currentQuestion.options.map((opt) => {
                  const checked = answerValue === opt.value;
                  return (
                    <label
                      key={opt.value}
                      className={`sat-option-row ${
                        checked ? 'is-selected' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q-${currentQuestion.id}`}
                        value={opt.value}
                        checked={checked}
                        onChange={() =>
                          onAnswer(currentQuestion.id, opt.value)
                        }
                      />
                      <span className="sat-option-letter">{opt.label}</span>
                      <span className="sat-option-text">{opt.value}</span>
                    </label>
                  );
                })}
              </div>
            )}

            {/* Grid-in / numeric */}
            {(!currentQuestion.options ||
              currentQuestion.options.length === 0) && (
              <div className="sat-gridin">
                <label className="sat-gridin-label">
                  Enter your answer:
                  <input
                    className="sat-gridin-input"
                    type="text"
                    value={answerValue ?? ''}
                    onChange={(e) =>
                      onAnswer(
                        currentQuestion.id,
                        e.target.value || null,
                      )
                    }
                  />
                </label>
              </div>
            )}

            {/* Bottom navigation */}
            <div className="sat-nav-bar">
              <button
                type="button"
                className="sat-nav-btn"
                onClick={onPrev}
              >
                Previous
              </button>
              <button
                type="button"
                className="sat-nav-btn"
                onClick={onNext}
              >
                Next
              </button>
            </div>
          </section>
        </main>

        {/* Right: tools (calculator, reference) */}
        <aside className="sat-tools">
          <div className="sat-tools-section">
            <div className="sat-tools-header">Calculator</div>
            <div className="sat-tools-body">
              {/* Later: embed Desmos */}
              Calculator area
            </div>
          </div>
          <div className="sat-tools-section">
            <div className="sat-tools-header">Reference</div>
            <div className="sat-tools-body">
              {/* Later: SAT reference sheet */}
              Reference sheet
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SatQuestionLayout;
