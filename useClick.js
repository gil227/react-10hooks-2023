export const useClick = (onClick) => {
    //인수로 전달된 값이 함수가 아니라면 실행을 하지 않음.
    if (typeof onClick !== "function") return;
    //target을 설정(getElement)
    const target = useRef();
    useEffect(() => {
        //target.current 유무 체크
        if (target.current) {
            //useEffect 안에 함수는 최초 생성시(mount)와 상태가 업데이트 됐을때 실행된다.
            target.current.addEventListener("click", onClick);
        }

        //useEffect 안에서 함수를 반환(return)하면
        //코드 실행을 종료후 마지막에 실행된다.
        //따라서 eventlistener를 마지막에 제거해준다.
        return () => {
            if (target.current) {
                target.current.removeEventListener("click", onClick);
            }
        };
        //dependency를([]) 넣고 비워두면 mount했을때만 실행된다.
        //[]를 완전히 안쓰고 비워둔다면 상태가 업데이트될 때도 실행된다.
    }, []);
    //const target을 반환해서 object에 useRef로 연결한다.(타겟참조,타겟캐치)
    return target;
};