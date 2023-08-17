const progress = {
  width: "100%",
  backgroundColor: "lightGrey",
  marginBottom: "10px",
  borderRadius: "15px",
};

function ProgressBar({
  barSize = "30px",
  barHeight = "1.5em",
  barColor = "gray",
}) {
  const bar = {
    width: barSize,
    height: barHeight,
    backgroundColor: barColor,
    borderRadius: "10px",
  };
  return (
    <div style={progress}>
      <div style={bar}></div>
    </div>
  );
}

export default ProgressBar;
