const cleanPercentage = (percentage) => {
  const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0;
  const isTooHigh = percentage > 100;
  const adjustedPercentage = percentage === 98 ? percentage + 2 : percentage; // change the logic later
  return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +adjustedPercentage;
};

const Circle = ({colour, percentage, r}) => {
  const circ = 2 * Math.PI * r; // circumference of the circle
  const strokePct = ((100 - percentage) * circ) / 100; // stroke starting point based on percentage

  return (
    <circle
      r={r}
      cx='50%'
      cy='50%'
      fill='transparent'
      stroke={strokePct !== circ ? colour : ""}
      strokeWidth={"10"} // you can make this relative as well
      strokeDasharray={circ}
      strokeDashoffset={percentage ? strokePct : 0}
      strokeLinecap='round'
    />
  );
};

const Text = ({percentage}) => (
  <text
    x='50%'
    y='50%'
    dominantBaseline='central'
    textAnchor='middle'
    fontSize='0.8rem' // Adjust size based on SVG size
  >
    {percentage.toFixed(0)}%
  </text>
);

const ProgressSection = ({percentage, firstName}) => {
  const pct = cleanPercentage(percentage);

  return (
    <div className='top-home'>
      <div className='progress-box'>
        <div className='text'>
          <h2>
            <i style={{marginRight: "5px", color: "orange"}} className='fa-solid fa-trophy'></i> PROGRESS KAMU SAAT INI
          </h2>
          <p>Pantau kemajuan kamu dan raih lebih banyak pencapaian !</p>
        </div>
        <div className='circle-container'>
          <svg
            width='100%' // Set width and height to be responsive
            viewBox='0 0 200 200' // Defines the viewBox to scale content inside the SVG
            preserveAspectRatio='xMidYMid meet'>
            <g transform='rotate(-90 100 100)'>
              <Circle colour='lightgrey' r={60} /> {/* Adjust radius to fit the viewBox */}
              <Circle colour='lightgreen' percentage={pct} r={60} />
            </g>
            <Text percentage={pct} />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ProgressSection;
