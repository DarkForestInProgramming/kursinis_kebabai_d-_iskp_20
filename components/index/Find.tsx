import { Stack, Image, Container } from "react-bootstrap";
import paths from "../../styles/paths.json";

export default function Find() {
  return (
    <section id="contact" className="contact">
      <div className="row gy-4 findas">
        <div className="col-md-6">
          <div className="info-item d-flex align-items-center bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon bi bi-map flex-shrink-0"
              viewBox="0 0 576 512"
            >
              <path d={paths[13]} />
            </svg>
            <div>
              <h3>Mus Rasite</h3>
              <p>Kriponio g. 33, Panevėžys</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="info-item d-flex align-items-center bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon bi bi-envelope flex-shrink-0"
              viewBox="0 0 576 512"
            >
              <path d={paths[12]} />
            </svg>
            <div>
              <h3>Susisiekite El. Paštu</h3>
              <p>deividas.sipelis@panko.lt</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="info-item d-flex align-items-center bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon bi bi-telephone flex-shrink-0"
              viewBox="0 0 576 512"
            >
              <path d={paths[4]} />
            </svg>
            <div>
              <h3>Užsisakyte Telefonu</h3>
              <p>+370 678 ** ***</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="info-item d-flex align-items-center bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon bi bi-share flex-shrink-0"
              viewBox="0 0 576 512"
            >
              <path d={paths[15]} />
            </svg>
            <div>
              <h3>Darbo Laikas</h3>
              <div>
                <strong>Pirm-Šešt:</strong> 10:00 - 22:00;
                <strong style={{ marginLeft: "10px" }}>Sekmadienį:</strong>{" "}
                Nedirbame
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
