export const useScroll = () => {
    const [color, setColor] = useState({ x: 0, y: 0 });
    const onScroll = () => {
        setColor({ x: window.scrollX, y: window.scrollY });
    };

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return color;
};