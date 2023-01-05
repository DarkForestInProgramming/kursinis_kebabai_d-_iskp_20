import { Stack } from "react-bootstrap";
import isMobile from "../../utilities/isMobile";

export default function Map() {
  const mob = isMobile(414);
  return (
    <Stack>
      <div className="section-header">
        <h2>Kontaktai</h2>
        <p style={{ fontSize: mob ? "40px" : "48px" }}>
          Kyla klausimų? <span>Susisiekite</span>
        </p>
      </div>
      <div className="mb-4">
        <iframe
          style={{ border: "0" }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2246.8032117792905!2d24.34818741604563!3d55.72717200143582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e63217849e3d0b%3A0x13ecbb3fe7a9dc02!2zUGFuZXbEl8W-aW8ga29sZWdpamE!5e0!3m2!1slt!2slt!4v1670524358606!5m2!1slt!2slt"
          frameBorder={0}
          width="100%"
          height="450"
          // width: "100%", height: "350px;"
        ></iframe>
      </div>
    </Stack>
  );
}
