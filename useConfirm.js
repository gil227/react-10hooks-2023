export const useConfirm = (message = "", onConfirm, onCancel) => {
    if (!onConfirm || typeof onConfirm !== "function") return;
    if (onCancel && typeof onCancel !== "function") return;

    const setConfirm = () => {
        //confirm을 띄워서
        //확인을 누르면 true (if 안의 함수 실행 o)
        //취소를 누르면 false가 전달된다.(if 안의 함수 실행 x)
        if (confirm(message)) {
            onConfirm();
        } else {
            onCancel();
        }
    };
    return setConfirm;
};