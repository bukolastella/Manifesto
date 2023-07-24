import { gsap } from "gsap";
import React, {
  FC,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import SplitType from "split-type";

gsap.registerEffect({
  name: "text-reveal",
  effect(targets: any) {
    const textPara = SplitType.create(targets, {
      types: "chars",
    });
    return gsap.to(textPara.chars, {
      backgroundSize: "100%",
      duration: 0.5,
      stagger: 0.5,
      ease: "power1.out",
      scrollTrigger: {
        trigger: targets,
        scrub: true,
        start: "top 80%",
        end: "bottom 25%",
        // markers: true,
      },
    });
  },
});

gsap.registerEffect({
  name: "enlarge",
  effect(targets: any) {
    return gsap.to(targets, {
      scaleX: 2,
      scrollTrigger: {
        trigger: targets,
        start: "120% 100%",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        // toggleActions: "restart reverse reverse reverse",
        // markers: true,
      },
    });
  },
});

interface Props {
  children: JSX.Element;
  effect: string;
  targetRef: any;
  vars?: any;
}

const GsapEffect: FC<Props> = forwardRef(
  ({ children, effect, targetRef, vars }, ref) => {
    const animation = useRef();
    const ctx = gsap.context(() => {});

    useEffect(() => {
      return () => ctx.revert();
    }, [ctx]);

    useLayoutEffect(() => {
      if (gsap.effects[effect]) {
        ctx.add(() => {
          animation.current = gsap.effects[effect](targetRef.current, vars);
        });
      }
    }, [ctx, effect, targetRef, vars]);

    useEffect(() => {
      // forward the animation instance if a ref is passed
      if (typeof ref === "function") {
        ref(animation.current);
      } else if (ref) {
        ref.current = animation.current;
      }
    }, [ref]);

    return <>{children}</>;
  }
);

export default GsapEffect;
