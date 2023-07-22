import React, { useLayoutEffect, useRef } from "react";
import { styled } from "styled-components";
import Colors from "../../styles/Colors";
import LaptopImage from "../../images/laptop.jpg";
import { gsap } from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const container = useRef<HTMLDivElement>(null);
  const h2Ref = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLDivElement>(null);
  const paraRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const imgRefContainer = useRef<HTMLImageElement>(null);
  const paraTextRef = useRef<HTMLImageElement>(null);
  const paraTextRefContainer = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (
        !h2Ref.current ||
        !h1Ref.current ||
        !paraRef.current ||
        !imgRef.current ||
        !imgRefContainer.current ||
        !paraTextRef.current
      )
        return;
      const text = SplitType.create(paraRef.current);
      const textPara = SplitType.create(paraTextRef.current, {
        types: "lines",
      });

      gsap
        .timeline()
        .from(h2Ref.current, { y: 100 })
        .from(h2Ref.current, { opacity: 0 }, "-=60%")
        .from(h1Ref.current, { y: 100, opacity: 0 }, 0.3)
        .from(text.lines, { y: 100, stagger: 0.2 }, 0.3)
        .from(text.lines, { opacity: 0, stagger: 0.2 }, "-=80%")
        .from(imgRef.current, { opacity: 0, duration: 1 }, "-=20%");

      const animation = gsap.to(imgRef.current, {
        scaleX: 2,
      });

      const paraAnimation = gsap.to(textPara.lines, {
        backgroundSize: "100%",
        duration: 0.5,
        stagger: 0.5,
        ease: "power1.out",
      });

      ScrollTrigger.create({
        trigger: imgRefContainer.current,
        start: "120% 100%",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        toggleActions: "restart reverse reverse reverse",
        // markers: true,
        animation,
      });

      ScrollTrigger.create({
        trigger: paraTextRefContainer.current,
        start: "top-=200 50%",
        end: "bottom+=200 100%",
        scrub: 0.5,
        toggleActions: "restart reverse reverse reverse",
        // markers: true,
        animation: paraAnimation,
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <Wrapper ref={container}>
      <H2 ref={h2Ref}>The mainifesto</H2>
      <H1Wrapper>
        <H1 ref={h1Ref}>portfolio website</H1>
      </H1Wrapper>
      <Para ref={paraRef}>
        Experience the <br /> perfect blend of creativity <br /> and
        functionality
      </Para>
      <ImageWrapper ref={imgRefContainer}>
        <Image src={LaptopImage} ref={imgRef} />
      </ImageWrapper>
      <ParaTextWrapper ref={paraTextRefContainer}>
        <ParaText ref={paraTextRef}>
          Stand out from the crowd and make a statement with our sleek and
          stylish portfolio template that speaks volumes about your creativity.
        </ParaText>
      </ParaTextWrapper>
    </Wrapper>
  );
};

export default Hero;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8rem;
  padding-bottom: 900px;
`;

const H1 = styled.h1`
  text-transform: uppercase;
  font-size: 6rem;
  color: ${Colors.White};
`;

const H1Wrapper = styled.div`
  overflow-y: hidden;
`;

const H2 = styled(H1)`
  font-weight: lighter;
`;

const Para = styled.p`
  font-size: 1.25rem;
  margin: 30px 0;
  color: ${Colors.White};
  margin-left: 15rem;
  font-weight: bold;
  line-height: 30px;
`;

const Image = styled.img`
  width: 600px;
  height: 600px;
  object-fit: cover;
  margin-bottom: 20px;
`;

const ImageWrapper = styled.div``;
const ParaTextWrapper = styled.div``;

const ParaText = styled.span`
  font-size: 3.7rem;
  font-weight: bolder;
  text-align: center;

  & > div {
    background-size: 0%;
    background-repeat: no-repeat;
    background-image: linear-gradient(90deg, white, white);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: rgba(255, 255, 255, 0.1);
  }
`;
