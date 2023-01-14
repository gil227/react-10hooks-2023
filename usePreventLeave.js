export const usePreventleave = () => {
    const onProtect = (e) => {
        e.preventDefault();
        //크롬에서 아래의 값은 넣어줘야한다...
        e.returnValue = "";
    };
    const enablePrevent = () =>
        window.addEventListener("beforeunload", onProtect);
    const disablePrevent = () =>
        window.removeEventListener("beforeunload", onProtect);

    return { enablePrevent, disablePrevent };
};