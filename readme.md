# React Hooks
리액트 훅을 사용하는 것은 함수형프로그래밍(functional programing)을 하는 것이다.
그리고 훅을 사용하지 않았을때 상태를 컨트롤 하려면 코드가 많이 길었다.

```js
//hook X
class App extends Component {
    state = {
        count:0
    };
    modify = n => {
        this.setState({count:n});
    }

    render(){
        const {count} = this.state;
        //+ 숫자, 버튼 마크업
    }
}

//hook O
const App = () => {
    const [count, setCount] = useState(0);
    return //+ 숫자, 버튼 마크업
}
```

# useState (2023.1.7)
> https://codesandbox.io/s/hook-study-g5nw8s?file=/src/App.js:0-487

```js
import "./styles.css";
import { useState } from "react";

export default function App() {
  const [item, setItem] = useState(1);
  const incrementItem = () => setItem(item + 1);
  const decrementItem = () => setItem(item - 1);

  return (
    <div className="App">
      <h1>Hello {item}</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={incrementItem}>incrementItem</button>
      <button onClick={decrementItem}>decrementItem</button>
    </div>
  );
}
```

## 1. useTitle
react document의 title을 몇개의 hooks과 함께 바꾸는것

## 2. useInput
input 역할을 하는 훅 (state나 effect처럼 만들어져 있는 훅이라기 보다는 useState를 이용해서 만들어낸 함수 로직 인것같다. **맞았다..**)

```js
const useInput = (intialValue) => {
  const [value, setValue] = useState(intialValue);
  const onChange = (event) => {
    console.log(event.target);
  };
  return { value, onChange };
};

export default function App() {
  //초기값
  const name = useInput("gil");
  return (
    <div className="App">
      <input type="text" placeholder="Name" {...name} />
    </div>
  );
}

```

## 3. usePageLeave
유저가 페이지를 벗어나는 시점을 찾고 함수를 실행하는 훅

## 4. useClick
element를 클릭시점을 찾아내는 hook

## 5. useFadeIn
애니메이션을 element 안으로 서서히 사라지게 하는 hook

## 6. useFullScreen
element를 풀스크린으로 만들거나 일반 화면으로 돌아가게 할 수 있는 hook

## 7. useHover
마우스를 올렸을때를 찾아내는 hook

## 8. useNetwork
온라인과 오프라인 상태를 감지하는 hook

## 9. useNotification
notification API를 사용시 유저에게 알림을 보내주는 hook

## 10. useScroll
스크롤을 감지하는 hook

## 11. useTabs
tab 기능을 쉽게 구현 해주는 hook
useState와 오브젝트 데이터를 이용해서 탭기능을 구현한다.
```js
const useTabs = (initalIndex, allTabs) => {
    //전체 오브젝트가 들어오지 않았을 경우 처리(undefined 처리?)
    if (!allTabs || !Array.isArray(allTabs)) return;
    const [currentIndex, setCurrentIndex] = useState(initalIndex);
    return {
        currentItem: allTabs[currentIndex],
        onChangeItem: setCurrentIndex
    };
};
```

## 12. usePreventLeave
변경사항을 저장하지 않고 페이지(브라우저)를 벗어나길 원할때 확인(confirm) 하는 hook

## 13. useConfirm
이벤트를 실행하기 전에 사용자에게 확인을 받는 기능을 하는 hook

## 14. useAxios
HTTP requests client axios 사용을 하는 hook