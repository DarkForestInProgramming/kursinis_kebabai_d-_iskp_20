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
} from "react-bootstrap";
import isMobile from "../../utilities/isMobile";

export default function Contact() {
  const mob = isMobile(414);
  return (
    <Stack>
      <div
        className="iContacts"
        style={{
          backgroundImage: `url(/images/backgroundas3.jpg)`,
          backgroundPosition: "center",
        }}
      >
        <div className="px-5">
          <div className="row gx-5 align-items-center justify-content-center">
            <div className="col-lg-8 col-xl-7 col-xxl-6">
              <div className="my-5 text-center text-xl-start">
                <h1
                  className="mb-2 contactTitle"
                  style={{ fontSize: mob ? "3.3rem" : "5rem" }}
                >
                  Pasitaikė neskanus kebabas? Susisiekite
                </h1>
                <p
                  className="mb-4 contactDescription"
                  style={{ fontSize: mob ? "0.9rem" : "1.2rem" }}
                >
                  Iškilo nesklandumų ar klausimų perkant? Susisiekite! Mūsų
                  komanda visada su malonumu pasiruošusi atsakyti ir išspręsti
                  jūsų problemas.
                </p>
                <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                  <Button
                    variant="danger"
                    className="px-4 me-sm-3"
                    href="/#contact"
                    size="sm"
                  >
                    Susisiekti
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
              <Image
                src="/images/susisiekite.jpg"
                className="img-fluid rounded-3 my-5"
              />
            </div>
          </div>
        </div>
      </div>
    </Stack>
  );
}
