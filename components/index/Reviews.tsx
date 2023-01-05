import {
  Button,
  Container,
  OverlayTrigger,
  Popover,
  Modal,
  Card,
  Image,
  Carousel,
  Stack,
  Placeholder,
} from "react-bootstrap";
import isMobile from "../../utilities/isMobile";

export default function Reviews() {
  const mob = isMobile(414);

  return (
    <Stack className="recomendationsC" id="recomendations">
      <div className="">
        <div className="section-header">
          <h2>Atsiliepimai</h2>
          <p style={{ fontSize: mob ? "40px" : "48px" }}>
            Garsių Klientų <span>Atsiliepimai</span>
          </p>
        </div>
      </div>
      <Container>
        <Carousel style={{ marginBottom: "1rem" }}>
          <Carousel.Item>
            <Image
              src="/images/atsiliepimai_katleris.jpg"
              alt="M.Katlerio atsiliepimas"
              className="d-block w-100"
            />
          </Carousel.Item>
          <Carousel.Item>
            <Image
              src="/images/atsiliepimai_penas.jpg"
              alt="P.Peno atsiliepimas"
              className="d-block w-100"
            />
          </Carousel.Item>
          <Carousel.Item>
            <Image
              src="/images/atsiliepimai_imbra.jpg"
              alt="I.Imbranovičiaus atsiliepimas"
              className="d-block w-100"
            />
          </Carousel.Item>
        </Carousel>
      </Container>
    </Stack>
  );
}
