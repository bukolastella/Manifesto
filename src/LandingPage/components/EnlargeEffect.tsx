import { gsap } from "gsap";
import React, {
  FC,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";

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
        toggleActions: "restart reverse reverse reverse",
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
