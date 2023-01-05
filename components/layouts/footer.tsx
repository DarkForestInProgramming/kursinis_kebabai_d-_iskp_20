import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Navbar, Container, Nav, Stack, Placeholder } from "react-bootstrap";

export function Footer() {
  return (
    <MDBFooter bgColor="white" className="text-center text-lg-start ">
      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />
                <Placeholder className="" as="p" animation="wave" bg="white">
                  <Placeholder bg="white" xs={12}>
                    <img src="/images/kursinis_logo.png" />
                  </Placeholder>
                </Placeholder>
              </h6>
              <p>
                Nesenai atsidariusi kebabinė Panevėžio mieste, siūlanti puikią
                kokybę ir skonį už priimtiną kainą.
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Navigacija</h6>
              <p>
                <a href="#pradzia" className="text-reset">
                  Pradžia
                </a>
              </p>
              <p>
                <a href="/meniu" className="text-reset">
                  Meniu
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Kontaktai</h6>
              <p>
                <MDBIcon icon="home" className="me-0" />
                +370 678 ** ***
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-0" />
                deividas.sipelis@panko.lt
              </p>
              <p>
                <MDBIcon icon="phone" className="me-0" /> Darbo laikas: I-VI,
                10:00-22:00
              </p>
              <p>
                <MDBIcon icon="print" className="me-0" /> Kriponio g. 33,
                Panevėžys
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      <Nav
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.05)",
          height: "32px",
          width: "100%",
          textAlign: "center",
          display: "inline-block",
          fontSize: "15px",
        }}
      >
        <p style={{ marginTop: "4px" }}>
          {" "}
          Visos teisės saugomos. DŠ ISKP-20 © 2022
        </p>
      </Nav>
    </MDBFooter>
  );
}
