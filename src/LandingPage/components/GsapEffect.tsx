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
  name: "opacity-text-reveal",
  defaults: {
    duration: 0.5,
    ease: "power1.out",
    stagger: 0.5,
    start: "top 80%",
    end: "bottom 25%",
    markers: false,
  },
  effect(targets: any, config: GSAPTweenVars) {
    const textPara = SplitType.create(targets, {
      types: "words",
    });
    return gsap.to(textPara.words, {
      color: "#777",
      duration: config.duration,
      stagger: config.stagger,
      ease: config.ease,
      scrollTrigger: {
        trigger: targets,
        scrub: true,
        start: config.start,
        end: config.end,
        markers: config.markers,
      },
    });
  },
});

gsap.registerEffect({
  name: "text-reveal",
  defaults: {
    duration: 0.5,
    ease: "power1.out",
    stagger: 0.5,
    start: "top 80%",
    end: "bottom 25%",
    markers: false,
  },
  effect(targets: any, config: GSAPTweenVars) {
    const textPara = SplitType.create(targets, {
      types: "chars",
    });
    return gsap.to(textPara.chars, {
      backgroundSize: "100%",
      duration: config.duration,
      stagger: config.stagger,
      ease: config.ease,

      scrollTrigger: {
        trigger: targets,
        scrub: true,
        start: config.start,
        end: config.end,
        markers: config.markers,
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
  vars?: GSAPTweenVars;
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
