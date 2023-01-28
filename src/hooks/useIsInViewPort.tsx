import { RefObject, useEffect, useMemo, useState } from 'react';

// // https://coderpad.io/blog/development/how-to-implement-infinite-scroll-in-react-js/
export default function useIsInViewport(ref: RefObject<HTMLVideoElement>) {
    
    const [isIntersecting, setIsIntersecting] = useState(false);

    const observer = useMemo(
        () =>
            new IntersectionObserver(([entry]) =>
                setIsIntersecting(entry.isIntersecting)
            ),
        []
    );

    useEffect(() => {
        ref.current && observer.observe(ref.current);

        return () => {
            observer.disconnect();
        }
    }, [ref, observer]);

    return isIntersecting;
}
