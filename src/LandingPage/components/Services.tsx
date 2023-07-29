import React, { useLayoutEffect, useRef } from "react";
import { styled } from "styled-components";
import GsapEffect from "./GsapEffect";
import { gsap } from "gsap";

const Services = () => {
  const container = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline().to(listRef.current, {
        height: "700px",
        duration: 5,
        scrollTrigger: {
          trigger: listRef.current,
          // markers: true,
          start: "50% 50%",
          scrub: 1,
        },
      });
    }, listRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <GsapEffect
        targetRef={container}
        effect={"grow"}
        vars={{ start: "top+=100 100%", end: "50% 50%" }}
      >
        <ServiceWrapper ref={container}>
          <ListWrapper ref={listRef}>
            <div>web design</div>
            <div>mobile app development</div>
            <div>e-commerce solutions</div>
            <div>digital marketing</div>
            <div>ui/ux design</div>
            <div>branch strategy</div>
            <div>seo optimization</div>
            <div>social media management</div>
            <div>content creation</div>
            <div>data analytics</div>
          </ListWrapper>
        </ServiceWrapper>
      </GsapEffect>
    </>
  );
};

export default Services;

const ServiceWrapper = styled.div`
  width: 80%;
  height: 500px;
  background-color: white;
  margin-top: 5rem;
  transform: translateY(50px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ListWrapper = styled.div`
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 3rem;
  height: 30px;
  overflow-y: hidden;
  -webkit-mask-image: -webkit-linear-gradient(
    transparent 25%,
    black 40%,
    black 60%,
    transparent 75%
  );
  mask-image: linear-gradient(
    transparent 25%,
    black 40%,
    black 60%,
    transparent 75%
  );
  perspective: 600px;

  & > div {
    text-transform: uppercase;
    transform: translateY(50px);
    transform-origin: 50% 50% -100px;
  }
`;
