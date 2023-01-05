import { Image, Stack, Carousel } from "react-bootstrap";
import isMobile from "../../utilities/isMobile";

export default function Banner() {
  const mob = isMobile(414);
  return (
    <Stack id="main">
      <Carousel>
        <Carousel.Item>
          <video
            className="w-100"
            autoPlay
            loop
            muted
            src="/videos/output.mp4"
          ></video>
          <Carousel.Caption>
            {" "}
            <div className="banneris">
              <div>
                <div
                  className=" row gx-5 align-items-center justify-content-center"
                  style={{
                    marginBottom: mob ? "0rem" : "11rem",
                  }}
                >
                  <div className="col-lg-8 col-xl-7 col-xxl-6">
                    <div className="">
                      <div className="text-center">
                        <Image
                          height={mob ? "0" : "60px"}
                          width={mob ? "0" : "260px"}
                          src="/images/kursinis_logo.png"
                        />
                      </div>
                      <h1
                        className="display-5 mb-2 bg-dark text-center"
                        style={{ fontSize: mob ? "2.5rem" : "5rem" }}
                      >
                        IkiSkanaus kebabai Panevėžyje
                      </h1>
                      <p
                        className="lead fw-normal text-white mb-4 bg-danger text-center"
                        style={{ fontSize: mob ? "0.8rem" : "1rem" }}
                      >
                        Vieni skaniausių kebabų Panevėžyje. Mus rasite šiuo
                        adresu: Kriponio g. 33
                      </p>
                      <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Stack>
  );
}
