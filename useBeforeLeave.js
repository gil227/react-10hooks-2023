export const useBeforeLeave = (onLeave) => {
    if (typeof onLeave !== "function") return;

    const setLeave = (e) => {
        const { clientY } = e;
        if (clientY <= 0) onLeave();
    };

    useEffect(() => {
        document.addEventListener("mouseleave", setLeave);
        return () => document.removeEventListener("mouseleave", setLeave);
    }, []);
};