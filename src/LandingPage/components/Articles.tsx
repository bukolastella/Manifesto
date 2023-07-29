import React, { useLayoutEffect, useRef } from "react";
import { styled } from "styled-components";
import { gsap } from "gsap";

const Articles = () => {
  const container = useRef<HTMLDivElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          defaults: {
            ease: "sine.in",
          },
          scrollTrigger: {
            trigger: container.current,
            // markers: true,
            start: "top 50%",
            end: "bottom+=70 60%",
            // scrub: 1,
            toggleActions: "restart reverse restart reverse",
          },
        })
        .to(container.current, { color: "white" })
        .to(paraRef.current, { height: "auto" }, "<");
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <Wrapper ref={container}>
      <div>2023</div>
      <div>UX, UI DESIGN, Javascript</div>
      <div>
        <H5>THE ART OF WEB ANIMATION</H5>
        <Para ref={paraRef}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur
          sapiente dolore, cum maxime porro reprehenderit vel nemo optio?
          Quaerat sed saepe, enim aliquid tempore eum natus laboriosam iusto
          pariatur culpa!
        </Para>

        <Btn>Read Article</Btn>
      </div>
    </Wrapper>
  );
};

export default Articles;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 5rem;
  color: #444;
  /* color: #777; */

  & > div {
    width: 100%;
  }
`;

const H5 = styled.h5`
  font-size: 2rem;
`;

const Para = styled.p`
  margin: 2rem 0;
  height: 0;
  overflow-y: hidden;
`;

const Btn = styled.button`
  color: inherit;
`;
