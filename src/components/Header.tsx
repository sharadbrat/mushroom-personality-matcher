interface Props {
  query: string;
  onQueryChange: (v: string) => void;
  onFindMushroom: () => void;
}

export default function Header({ query, onQueryChange, onFindMushroom }: Props) {
  return (
    <div className="header-bar">
      <div className="header-title-group">
        <div className="header-title">Mushroom Personality Matcher</div>
        <div className="header-subtitle">Pick a clay friend and take the compatibility test</div>
      </div>
      <div className="header-controls">
        <div className="search-box">
          <svg width="18" height="18" viewBox="0 0 18 18">
            <circle cx="8" cy="8" r="6" fill="none" stroke="#8a7a63" strokeWidth={2} />
            <line x1="12.4" y1="12.4" x2="17" y2="17" stroke="#8a7a63" strokeWidth={2} strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search mushrooms by name..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
        </div>
        <button className="find-mushroom-button" onClick={onFindMushroom}>
          Not sure? Find my mushroom
        </button>
      </div>
    </div>
  );
}
