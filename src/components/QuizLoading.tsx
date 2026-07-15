interface Props {
  title: string;
  subtitle: string;
  pct: number;
}

export default function QuizLoading({ title, subtitle, pct }: Props) {
  return (
    <div className="loading-phase">
      <div className="loading-title">{title}</div>
      <div className="loading-subtitle">{subtitle}</div>
      <div className="loading-bar-track">
        <div className="loading-bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="loading-pct">{pct}%</div>
    </div>
  );
}
