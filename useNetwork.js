export const useNetwork = (onChange) => {
    const [state, setState] = useState(navigator.onLine);
    const networkState = () => {
        //온,오프라인에서 함수를 실행 시키고 싶을때 사용한다.
        if (typeof onChange === "function") {
            onChange(navigator.onLine);
        }
        setState(navigator.onLine);
    };
    useEffect(() => {
        window.addEventListener("online", networkState);
        window.addEventListener("offline", networkState);

        return () => {
            window.removeEventListener("online", networkState);
            window.removeEventListener("offline", networkState);
        };
    }, []);

    return state;
};