export const useFadeIn = (duration = 1, delay) => {
    const setEl = useRef();
    useEffect(() => {
        const { current } = setEl;
        current.style.opacity = 1;
        current.style.transition = `opacity ${duration}s ${delay}s ease-out`;
    }, []);
    return { ref: setEl, style: { opacity: 0 } };
};