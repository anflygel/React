import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

class ClassComponent extends React.Component {
  constructor(props) {
    super(props);

    console.log("constructor");

    this.state = {
      count: 0,
      films: ["film1"],
      test: {
        id: 1,
      },
    };
  }
  // через конструктор уже мало кто пишет
  // state = {
  //   count: 0,
  //   films: ["film1"],
  //   test: {
  //     id: 1,
  //   },
  // };
  // можно теперь объявлять переменные таким образом^

  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps");
  }

  listener = () => {
    console.log("click");
  };

  componentDidMount() {
    document.addEventListener("click", this.listener);
    console.log("componentDidMount");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate");
    return {};
  }

  componentDidUpdate() {
    // эффекты
    // запросы
    // подписки
    // таймеры
    // работа с ДОМ
    // слушатели
    console.log("componentDidUpdate");
  }

  componentWillUnmount() {
    // очистка слушателей
    // удаление подписки
    console.log("componentWillUnmount");
    document.removeEventListener("click", this.listener);
  }

  increment = () => {
    // this.setState({
    //   count: this.state.count + 1,
    // });
    this.setState((state) => ({
      count: state.count + 1,
    }));
    this.setState((state) => ({
      count: state.count + 1,
    }));
    this.setState(
      (state) => ({
        count: state.count + 1,
      }),
      () => {
        // console.log("state", this.state);
      }
    );
  };

  decrement = () => {
    this.setState({
      count: this.state.count - 1,
    });
  };

  addFilm = () => {
    const film = "new film";
    this.setState({
      films: [...this.state.films, film],
    });
  };

  render() {
    console.log("render");
    const { count, films, test } = this.state;

    return (
      <div>
        <h1>ClassComponent</h1>
        <div>
          <h1>
            Count: <span>{count}</span>
          </h1>
          <button onClick={this.increment}>increment</button>
          <button onClick={this.decrement}>decrement</button>
          <hr />
        </div>

        <div>
          <h1>films:</h1>
          <button onClick={this.addFilm}>Add New Film</button>
          <div>
            <span>
              {films.map((film) => (
                <h1>{film}</h1>
              ))}
            </span>
          </div>
          <hr />
        </div>

        <div>
          <h1>test:</h1>
          <div>
            <h1>
              <span>{test.id}</span>
            </h1>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

const Test = ({ count, cb }) => {
  const [testCount, setTestCount] = useState(100);
  // если у нас есть состояние внутри тест, для того чтобы это состояние поднять наверх
  // нужно либо просто его перенести наверх
  // либо с помощью колбэка (передаем cb в функцию)

  return (
    <div>
      <h1>Test</h1>
      <h1>
        Count: <span>{count}</span>
        <span> </span>
        testCount: <span>{testCount}</span>
      </h1>
      <button onClick={() => cb(testCount)}>cb</button>
      <button onClick={() => setTestCount(testCount + 1)}>increment</button>
      <hr />
      <hr />
    </div>
  );
};

const FunctionComponent = () => {
  const [count, setCount] = useState(0);
  // Проводим деструктуризацию
  // первый элемент массива - наше текущее состояние
  // второй элемент это функция с помощью которой мы это состояние можем обновлять
  const [films, setFilms] = useState(["film1"]);

  // const [testCount, setTestCount] = useState(0);
  // рекомендованый способ поднять состояние наверх

  const [test, setTest] = useState({
    id: 1,
  });

  // const [t, s] = useState({
  //   test:{id:1},
  //   count: 1,
  //   films: ["film1"]
  // })
  // можно все объединить в одном useState, но лучше так не усложнять код^

  useEffect(() => {
    //  -побочных эффектов
    //  -запросы
    //  -подписки
    //  -таймеры
    //  -работа с ДОМ
    //  -слушатели
    console.log("useEffect 1");

    // setCount((c)=> c + 1); +
    // setCount(count + 1); -

    return () => {
      console.log("useEffect 1: remove");
    };
  }, []);
  // перый аргумент колбэк, второй массив, в колбэке можно делать все что и в дидмаунт
  // если второй аргумент - пустой массив, эффект вызывается один раз
  // если нет, эффект вызывается всегда, когда обновляется компонент

  useEffect(() => {
    console.log("useEffect: test remove");

    return () => {};
  });
  // для стадии удаления, эффект должен возвращать колбэк

  useEffect(() => {
    console.log("useEffect 2");
  });
  // Эффект это просто ф-ия, которой мы говорим, когда нужно вызваться.

  useEffect(() => {
    console.log("useEffect 3: count", count);
  }, [count]);
  // Чтобы эффект следил за какими то зависимостями, мы передаем их внутрь
  // какие бы зависимости мы не передали в массив, эффект следит за ними
  // как только одна из зависимостей эффект меняется, эффект вызывается

  const addFilms = () => {
    const film = "New Film";
    setFilms([...films, film]);
  };

  return (
    <div>
      <h1>Function Component</h1>
      <Test count={count} cb={(s) => setCount(s)} />
      {/* чтобы в тесте получить состояние из FunctionComponent необходимо его передать пропсом */}
      {/* чтобы передать состояние наверх, нужно передать его в колбэк */}
      <Test count={count} cb={(s) => setCount(s)} />
      {/* у каждого компонента свое состояние изолированное состояние */}
      <div>
        <h1>
          Count: <span>{count}</span>
        </h1>
        <button onClick={() => setCount(count + 1)}>increment</button>
        <button onClick={() => setCount(count - 1)}>decrement</button>
        {/* повторяющиеся записи писать с колбэком как и в классах */}
        <button onClick={() => setCount((s) => s + 1)}>increment</button>
        <button onClick={() => setCount((s) => s - 1)}>decrement</button>
        {/* колбеки нужны чтобы обновить состояние из ребенка (дочерний компонент)  */}

        {/* <Component setCount={setCount} />

        Component = ({setCount}) => {
          () => setCount((state) => state + 1)
        } */}
        <hr />
      </div>
      <div>
        <h1>films:</h1>
        <button onClick={addFilms}>Add New Film</button>
        <div>
          <span>
            {films.map((film) => (
              <h1>{film}</h1>
            ))}
          </span>
        </div>
        <hr />
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const Component = () => {
  const [isVisible, setVisible] = useState(true);
  return (
    <div>
      <button onClick={() => setVisible(!isVisible)}>setVisible</button>
      {isVisible && <FunctionComponent />}
    </div>
  );
};

root.render(
  // <React.StrictMode>
  <Component />
  // </React.StrictMode>
);

// StrictMode делает проверки и вызывает эффекты по 2 раза

// С помощью колбека мы можем поднять состояние наверх 1:07:00
