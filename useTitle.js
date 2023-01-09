export const useTitle = (initial) => {
    const [title, setTitle] = useState(initial);
    const update = () => {
        const HTML = document.querySelector("title");
        HTML.innerText = title;
    };
    useEffect(update, [title]);
    return setTitle;
};