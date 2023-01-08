export const useInput = (intialValue, vaildator) => {
    const [value, setValue] = useState(intialValue);
    const onChange = (event) => {
        //요것도 가능 const value = event.target.value;
        const {
            target: { value }
        } = event;
        let isUpdate = true;
        if (typeof vaildator === "function") {
            isUpdate = vaildator(value);
        }
        if (isUpdate) {
            setValue(value);
        }
    };
    return { value, onChange };
};