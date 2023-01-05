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

export default function Hottest() {
  const mob = isMobile(414);
  return (
    <Stack>
      <div style={{ marginTop: "3rem" }}>
        <div className="container px-4">
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-10 col-xl-7">
              <div className="text-center">
                <a href="#karsciausi">
                  <Image
                    height={mob ? "140" : "200"}
                    width={mob ? "310" : "500"}
                    src="/images/hottest_offers.png"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Stack>
  );
}
