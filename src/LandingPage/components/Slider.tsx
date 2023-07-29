import { gsap } from "gsap";
import React, { useLayoutEffect, useRef } from "react";
import { styled } from "styled-components";

const Slider = () => {
  const container = useRef<HTMLDivElement>(null);
  const container1 = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const miniRef = useRef<HTMLDivElement>(null);
  const pRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const box =
        self.selector &&
        self.selector([".box_1", ".box_2", ".box_3", ".box_4"]);

      gsap.set(scrollRef.current, {
        width: "0%",
      });

      let scrollTween = gsap
        .timeline({
          defaults: {
            ease: "none",
          },
          scrollTrigger: {
            trigger: container1.current,
            start: "top top",
            scrub: 0.2,
            pin: true,
            // markers: true,
          },
        })
        .to(
          scrollRef.current,
          {
            width: "100%",
          },
          0
        )
        .to(
          sliderRef.current,
          {
            xPercent: -37,
          },
          0
        );

      for (let index = 0; index < box.length; index++) {
        gsap.to(box[index], {
          scrollTrigger: {
            trigger: box[index],
            containerAnimation: scrollTween,
            start: "top 40%",
            scrub: 1,
            // markers: true,
            toggleClass: "active",
          },
        });
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <Container1 ref={container1}>
      <Container ref={container}>
        <Wrapper ref={sliderRef}>
          <MiniWrapper ref={miniRef}>
            <H1 className="box_1">WE CONNECT YOUR BRAND WITH PEOPLE</H1>
            <H1 className="box_2">WE CONNECT YOUR BRAND WITH PEOPLE</H1>
            <H1 className="box_3">WE CONNECT YOUR BRAND WITH PEOPLE</H1>
            <H1 className="box_4">WE CONNECT YOUR BRAND WITH PEOPLE</H1>
          </MiniWrapper>
          <Scroll>
            <ScrollBar ref={scrollRef} />
          </Scroll>
          <MiniWrapper ref={pRef}>
            <Para className="box_1">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti
              maiores et ratione, voluptatibus nesciunt ipsa sequi neque atque
              dolor reiciendis deleniti explicabo tempore hic quia eligendi.
              Nobis porro voluptatem cumque?
            </Para>
            <Para className="box_2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti
              maiores et ratione, voluptatibus nesciunt ipsa sequi neque atque
              dolor reiciendis deleniti explicabo tempore hic quia eligendi.
              Nobis porro voluptatem cumque?
            </Para>
            <Para className="box_3">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti
              maiores et ratione, voluptatibus nesciunt ipsa sequi neque atque
              dolor reiciendis deleniti explicabo tempore hic quia eligendi.
              Nobis porro voluptatem cumque?
            </Para>
            <Para className="box_4">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti
              maiores et ratione, voluptatibus nesciunt ipsa sequi neque atque
              dolor reiciendis deleniti explicabo tempore hic quia eligendi.
              Nobis porro voluptatem cumque?
            </Para>
          </MiniWrapper>
        </Wrapper>
      </Container>
    </Container1>
  );
};

export default Slider;

const Container1 = styled.div`
  width: 100%;
  overflow-x: hidden;

  .active {
    color: white;
  }
`;

const Container = styled.div`
  color: #444;
  margin-top: 5rem;
  display: inline-block;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-right: 4rem;
`;

const MiniWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 500px);
  gap: 5rem;
`;

const H1 = styled.h1`
  font-size: 2rem;
`;

const Para = styled.p`
  font-size: 1rem;
`;

const Scroll = styled.div`
  height: 2px;
  background-color: #444;
`;

const ScrollBar = styled.div`
  height: 100%;
  background-color: white;
`;
