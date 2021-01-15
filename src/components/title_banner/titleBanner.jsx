const TitleBanner = (props) => {
  return (
    <header
      style={{
        height: "2.5rem",
        backgroundColor: "#fca311",
        opacity: "0.9",
        textAlign: "center",
      }}
    >
      <h3>{props.title}</h3>
    </header>
  );
};

export default TitleBanner;
