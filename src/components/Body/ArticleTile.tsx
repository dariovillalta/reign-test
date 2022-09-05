//Libraries Imports
import {useEffect, useState} from 'react';

//Other Imports
import clock from"../../date.svg";
import like from"../../like.svg";
import unlike from"../../unlike.svg";

//Styles

//Types
import {NewsArticle} from '../../models/NewsArticle';

type MyProps = {
    articles: NewsArticle[]
};

export default function ArticleTile(props: MyProps) {

    const articleTiles = () => props.articles.map((article, index) => {
        return  <div className="col-12 col-md-6 news-tile-container no-padding">
                    <div className="news-tile-container-text display-inline-block vertical-align-top">
                        <div className="news-tile-container-text-date">
                            <div className="display-inline-block news-tile-container-text-date-clocklogo-container vertical-align-top">
                                <div className="full-width full-height center-vh-flex">
                                    <img src={clock} className="news-tile-container-text-date-clocklogo"/>
                                </div>
                            </div>
                            <div className="display-inline-block news-tile-container-text-date-clocktext-container vertical-align-top">
                                <div className="news-tile-container-text-date-clocktext-container-flex">
                                    <p className="news-tile-container-text-date-clocktext no-marging">{"timeDifference(article.date) by article.author"}</p>
                                </div>
                            </div>
                        </div>
                        <div className="news-tile-container-article">
                            <p className="medium-font">Yes, React is taking over front-end development. The question is why.</p>
                        </div>
                    </div>
                    <div className="news-tile-container-like display-inline-block vertical-align-top">
                        <div className="full-height full-width center-vh-flex">
                            <img src={unlike} className=""/>
                        </div>
                    </div>
                </div>;
    });

    return (
        <div className="row no-padding no-marging news-tiles-container">
            {articleTiles()}
        </div>
    );
}