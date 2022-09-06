
//Libraries Imports
import React, {useEffect, useState} from 'react';

//Other Imports
import clock from"../../date.svg";
import like from"../../like.svg";
import unlike from"../../unlike.svg";

//Styles

//Types
import {NewsArticle} from '../../models/NewsArticle';

type MyProps = {
    articles: NewsArticle[],
    filterLiked: boolean,
    onLikeChange: (index: number) => void
};

export default function ArticleTile(props: MyProps) {

    const timeSince = (date: Date): String => {
        var seconds = Math.floor((new Date().getSeconds() - date.getSeconds() / 1000));
        var interval = seconds / 31536000;
        if (interval > 1) {
            return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }

    const openInNewTab = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const pressLike = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
        e.stopPropagation();
        props.onLikeChange(index);
    };

    const articleTiles = () => props.articles.map((article, index) => {
        if(!props.filterLiked || (props.filterLiked && article.liked))
            return  <div className="col-12 col-md-6 news-tile-container no-padding" onClick={() => openInNewTab(article.url!==null && article.url!==undefined && article.url.length>0 ? article.url : article.story_url!==null && article.story_url!==undefined && article.story_url.length>0 ? article.story_url : '_blank')} key={article.objectID}>
                        <div className="news-tile-container-text display-inline-block vertical-align-top">
                            <div className="news-tile-container-text-date">
                                <div className="display-inline-block news-tile-container-text-date-clocklogo-container vertical-align-top">
                                    <div className="full-width full-height center-vh-flex">
                                        <img src={clock} className="news-tile-container-text-date-clocklogo"/>
                                    </div>
                                </div>
                                <div className="display-inline-block news-tile-container-text-date-clocktext-container vertical-align-top">
                                    <div className="news-tile-container-text-date-clocktext-container-flex">
                                        <p className="news-tile-container-text-date-clocktext no-marging">{timeSince(new Date(article.created_at)) +" ago by " + article.author}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="news-tile-container-article">
                                <p className="medium-font">{
                                    article.title!==null && article.title!==undefined && article.title.length>0
                                    ?   article.title
                                    :   article.story_title
                                }</p>
                            </div>
                        </div>
                        <div className="news-tile-container-like display-inline-block vertical-align-top" onClick={(e) => pressLike(e, index)}>
                            <div className="full-height full-width center-vh-flex">
                                <img src={article.liked ? like : unlike} className=""/>
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