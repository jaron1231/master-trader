import React from 'react'


export default function NewsCardComponent({ news }) {
    function getDate(msec) {
        return (new Date(msec)).toDateString();
    }
    return (

        <a href={news.url}><div className="card">

            <div className="left-col">
                <img className="newsImage" src={news.image} alt="" srcset="" />
            </div>
            <div className="right-col">
                <h1>{news.headline}</h1>
                <p className="summary">{news.summary}</p>
                <div className="extra-info">
                    <p>{news.stockPrice && news.stockPrice['05. price']}</p>
                    <p>{getDate(news.datetime)} |&nbsp;</p>
                    <p>{news.source} </p>

                    <p className={`sentiment ${news.sentiment}`}>{news.sentiment}</p>
                </div>
            </div>
        </div>
        </a>


    )
}
