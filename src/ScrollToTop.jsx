import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.history.scrollRestoration = "manual";

        // First reset
        window.scrollTo(0, 0);

        // Safari can restore/adjust the position after the
        // new route has rendered, so reset again after layout.
        const frame1 = requestAnimationFrame(() => {
            window.scrollTo(0, 0);

            const frame2 = requestAnimationFrame(() => {
                window.scrollTo(0, 0);
            });

            return () => cancelAnimationFrame(frame2);
        });

        return () => cancelAnimationFrame(frame1);
    }, [pathname]);

    return null;
};