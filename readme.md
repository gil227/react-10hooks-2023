# React Hooks
리액트 훅을 사용하는 것은 함수형프로그래밍(functional programing)을 하는 것이다.
그리고 훅을 사용하지 않았을때 상태를 컨트롤 하려면 코드가 많이 길었다.

useState,useEffect,useRef 외 나머지는 앞의 세개를 사용해서 함수형프로그래밍을 작성하는 방법을 배운다.(이것이... 디자인패턴?)

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

# useEffect (2023.1.9)
useEffect는 첫번째 인수로 함수를 받을 수 있고, 두번째 인수로 deps를 받을수 있다.
여기서 deps는 전달된 값이 상태가 변할때 마다 첫번째 인수로 전달받은 값을 실행 시킨다.
아무것도 전달 받지 않으면 최초 렌더시에만 실행된다.

```js
export default function App() {
    const sayHello = () => console.log("hi!");
    const [number, setNumber] = useState(0);
    //첫번째인수로 console을 전달
    //두번째 인수로 useState의 number를 전달 받았다.
    //따라서 버튼을 누를때마다 setNumber가 실행되므로(number의 state가 변함)
    //sayHello(console)함수가 실행 된다.
    useEffect(sayHello, [number]);
    return (
    <div className="App">
      <button onClick={() => setNumber(number + 1)}>{number}</button>
    </div>
    );
}
```

## useEffect return
```js
useEffect(()=>{
    const target = useRef();
    target.current.addEventListener('click',f);
    
    //useEffect안에서 함수를 반환하면 unMount때 실행한다.
    //그리하여 이벤트 리스너를 제거해준다.
    return target.current.removeEventListener('click',f); 
});
```

# useRef (2023.1.12)
useRef는 document.getElementById() 와 같이 돔 오브젝트를 셀렉해주는 역할을 한다.
```js
const getId = useRef();
console.log(getId); // object{current}
console.log(getId.current); // <div></div>

const App = () =>{
    return (
        <div ref={getId}></div>
    )
}
```

## 1. useTitle
react document의 title을 몇개의 hooks과 함께 바꾸는것
head의 있는 title태그를 useEffect, useState를 사용해서 바꾼다.

```js
const useTitle = (initial) => {
  const [title, setTitle] = useState(initial);
  const update = () => {
    const HTML = document.querySelector("title");
    HTML.innerText = title;
  };
  useEffect(update, [title]);
  return setTitle;
};

export default function App() {
  const titleChange = useTitle("hihi!");
  setTimeout(() => titleChange("hihi2"), 3000);
  return (
    <div className="App">
      <h1>hi</h1>
    </div>
  );
}
```

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

## 3. useBeforeLeave (2023.1.14)
유저가 페이지를 벗어나는 시점을 찾고 함수를 실행하는 훅, 강의에서는 cilentY가 0 이하일때 함수가 실행하도록 만들었다.

## 4. useClick
element를 클릭시점을 찾아내는 hook

## 5. useFadeIn
애니메이션을 element 안으로 서서히 사라지게 하는 hook

## 6. useFullScreen
element를 풀스크린으로 만들거나 일반 화면으로 돌아가게 할 수 있는 hook

## 7. useHover
마우스를 올렸을때를 찾아내는 hook

## 8. useNetwork (2023.1.14)
네트워크의 온라인과 오프라인 상태를 감지하는 hook
```js
const useNetwork = (onChange) => {
  const [state, setState] = useState(navigator.onLine);
  const networkState = () => {
    //온,오프라인에서 함수를 실행 시키고 싶을때 사용한다.
    //필요없다면 안써도 무방.
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
```

## 9. useNotification (2023.1.15)
notification API를 사용시 유저에게 알림을 보내주는 hook
(맥 기준으로 설명하면 오른쪽 위에 배너 알림을 띄워주는 것이다.)

## 10. useScroll (2023.1.15)
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

## 12. usePreventLeave (2023.1.14)
변경사항을 저장하지 않고 페이지(브라우저)를 벗어나길 원할때 확인(confirm) 하는 hook
브라우저를 떠날때(닫을때 혹은 새로고침할때)

## 13. useConfirm (2023.1.14)
이벤트를 실행하기 전에 사용자에게 확인을 받는 기능을 하는 hook

## 14. useAxios
HTTP requests client axios 사용을 하는 hook