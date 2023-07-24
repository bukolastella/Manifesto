import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { FC, useLayoutEffect, useRef } from "react";
import SplitType from "split-type";
import { styled } from "styled-components";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  text: string;
}

const TextReveal: FC<Props> = ({ text }) => {
  const paraTextRef = useRef<HTMLSpanElement>(null);
  const paraTextRefContainer = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!paraTextRef.current) return;
    const textPara = SplitType.create(paraTextRef.current, {
      types: "lines",
    });

    const ctx = gsap.context(() => {
      const paraAnimation = gsap.to(textPara.lines, {
        backgroundSize: "100%",
        duration: 0.5,
        stagger: 0.5,
        ease: "power1.out",
      });

      ScrollTrigger.create({
        trigger: paraTextRefContainer.current,
        start: "top 80%",
        end: "bottom+=200 100%",
        scrub: 0.5,
        toggleActions: "restart reverse reverse reverse",
        // markers: true,
        animation: paraAnimation,
      });
    }, paraTextRefContainer);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={paraTextRefContainer}>
      <ParaText ref={paraTextRef}>{text}</ParaText>
    </div>
  );
};

export default TextReveal;

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
