import "./footer.css";

const Footer = () => {
  const iconPath = `${process.env.PUBLIC_URL}/icons/`;
  return (
    <div className="footer d-flex flex-row align-items-end pb-3">
      <img
        className="social-media-icons ml-3"
        src={`${iconPath}Facebook_icon.png`}
        alt="Facebook Icon"
        style={{ background: "white", borderRadius: "5px" }}
      ></img>
      <img
        className="social-media-icons ml-3"
        src={`${iconPath}Twitter_icon.png`}
        alt="Twitter Icon"
      ></img>
      <img
        className="social-media-icons ml-3"
        src={`${iconPath}Instagram_icon.png`}
        alt="Instagram Icon"
        style={{ background: "lightgrey", borderRadius: "6px" }}
      ></img>
    </div>
  );
};

export default Footer;
