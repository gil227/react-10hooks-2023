export const useTabs = (initalIndex, allTabs) => {
    if (!allTabs || !Array.isArray(allTabs)) return;
    const [currentIndex, setCurrentIndex] = useState(initalIndex);
    return {
        currentItem: allTabs[currentIndex],
        onChangeItem: setCurrentIndex
    };
};