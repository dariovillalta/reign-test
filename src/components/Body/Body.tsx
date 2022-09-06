//Libraries Imports
import React, {useEffect, useState} from 'react';
import {loadArticlesInit, getArticles} from '../../lib/api';

//Components Imports
import SelectQuery from './SelectQuery';
import ArticleTile from './ArticleTile';
import Pagination from './Pagination';

//Other Imports

//Styles

//Types
import {NewsArticle} from '../../models/NewsArticle';

type MyProps = {
};

export default function Body(props: MyProps) {
    let queryDefaultValue: string | null = localStorage.getItem('query');
    const [query, setQuery] = useState<string>(typeof queryDefaultValue === 'string' ? queryDefaultValue : "" );
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        loadArticles();
    }, []);

    useEffect(() => {
        console.log('articles', articles);
    }, [articles]);

    useEffect(() => {
        console.log('query', query);
    }, [articles]);

    useEffect(() => {
        if(query!==undefined && query.length>0 && currentPage!==undefined)
            getPage(currentPage);
    }, [query, currentPage]);

    const loadArticles = async () => {
        const res: NewsArticle[] = (await loadArticlesInit().then(r => {return r}).catch(() => {{}}) ) as NewsArticle[];
        setArticles(res);
        let totalPagesTemp: number = res[0].totalPages as number;
        if(totalPagesTemp !== undefined) {
            setTotalPages(totalPagesTemp);
        }
    }

    const getPage = async (page: number) => {
        const res: NewsArticle[] = (await getArticles(page, query).then(r => {return r}).catch(() => {{}}) ) as NewsArticle[];
        setArticles(res);
    }

    const changePage = (page: number): void => {
        getPage(page);
        setCurrentPage(page);
    }

    const filterNulls = (article: NewsArticle) => {
        //return article.story_title!==null && article.story_url!==null;
    }

    return (
        <div className="row body-container">
            <div className="no-padding offset-1 col-10">
                <div className="center-vh-flex">
                    <div className="timeline-option-container">
                        <div className="timeline-option display-inline-block text-center on-cursor-hover selected">
                            <p className="no-marging">All</p>
                        </div>
                        <div className="timeline-option display-inline-block text-center on-cursor-hover">
                            <p className="no-marging">My faves</p>
                        </div>
                    </div>
                </div>
                <div>
                    <SelectQuery defaultValue={query} changeDefaultValue={setQuery}/>
                </div>
                <div className="news-container">
                    <ArticleTile articles={articles}/>
                    <div className="news-navigation-container center-vh-flex">
                        <Pagination totalPages={totalPages} currentPage={currentPage} paginationSize={7} changePage={changePage}/>
                    </div>
                </div>
            </div>
        </div>
    );
}