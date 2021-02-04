const TitleBanner = (props) => {
  return (
    <header
      style={{
        backgroundImage: "linear-gradient(black, #14213D)",
        borderTop: "2px solid black",
        color: "white",
        opacity: "0.9",
        textAlign: "center",
      }}
    >
      <h2 className="py-2 my-0 mx-3"
      style={{
        borderBottom: "4px solid white"
      }}
      >{props.title}</h2>
    </header>
  );
};

export default TitleBanner;
