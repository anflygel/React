import React from "react"
import './test.css'
import styles from './test.module.css'
console.log(styles)

function FilmsList({ film, title }) {
    return (
        <div style={{ border: '1px solid red' }}>
            <h1>{title} film:</h1>
            <div>{film.map((film) => (
                <div>
                    <h3>{film.title}</h3>
                    <h3>{film.year}</h3>
                    <hr />
                </div>
            ))}
            </div>
        </div>
    )
}

function Info({ props1, props2, props3, props4, props5 }) {
    return (
        <div className={styles.wrapper}>

            <h1>props1: {props1}</h1>
            <h1>props2: {props2}</h1>
            <h1>props3: {JSON.stringify(props3)}</h1>
            <h1>props5: {props5}</h1>

            <button onClick={props4}>props4</button>
        </div>
    )
}

export function Test({ film, ...rest }) {

    return (
        <div>
            <h1>test</h1>
            <Info {...rest} />
            <FilmsList film={film} title="function" />

        </div>
    )

}