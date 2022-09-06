//Libraries Imports
import React, {useState, useEffect} from 'react';

//Styles

//Types
type MyProps = {
    totalPages: number,
    currentPage: number,
    paginationSize: number,
    changePage: (page: number) => void
};

type Pagination = {
    page: number,
    show: string,
    selected: boolean
};

export default function Pagination(props: MyProps) {

    const [pagination, setPagination] = useState<Pagination[]>([]);

    useEffect(() => {
        updatePaginationArray();
    }, [props.totalPages, props.currentPage]);

    const updatePaginationArray = () => {
        let tempPagination: Pagination[] = Array.from({length: props.totalPages}, (_, i) => {
            const tempPage: Pagination = {
                page: i+1,
                show: 'false',
                selected: false
            }
            return tempPage;
        });
        const resultsMiddle: number = props.totalPages/2;
        const paginationMiddle: number = Math.round(props.paginationSize/2);
        for (let index = 0; index < tempPagination.length; index++) {
            const page: number = tempPagination[index].page;
            if(page < resultsMiddle && props.currentPage <= paginationMiddle){
                if(page < props.paginationSize - 1){
                    tempPagination[index].show = "true";
                }else if(page === props.paginationSize - 1){
                    tempPagination[index].show = "dots";
                }
            //2 to also count the button that can't hide
            }else if(page >= props.totalPages - (props.paginationSize - 2) && props.currentPage >= props.totalPages - paginationMiddle+1){
                if(page === props.totalPages - (props.paginationSize - 2)){
                    tempPagination[index].show = "dots";
                }else if(page > props.totalPages - (props.paginationSize - 2)){
                    tempPagination[index].show = "true";
                }
            }else if(page === props.currentPage - ((props.paginationSize - 3)/2) || page === props.currentPage + ((props.paginationSize - 3)/2) ){
                tempPagination[index].show = "dots";
            }else if(page > props.currentPage - ((props.paginationSize - 3)/2) && page < props.currentPage + ((props.paginationSize - 3)/2) ){
                tempPagination[index].show = "true";
            }else{
                tempPagination[index].show = "false";
            }

            if(page===props.currentPage){
                tempPagination[index].selected = true;
            }
        }
        tempPagination[0].show = "true";
        tempPagination[tempPagination.length-1].show = "true";

        setPagination(tempPagination);
    };

    const availablePages = () => pagination.map((page, index) => {
        return  page.show.localeCompare("true")===0
                ?
                    <div className={"display-inline-block news-navigation-container-tile text-center"+(page.page===props.currentPage?" selected":"")} onClick={() => props.changePage(page.page)} key={index}>
                        {page.page}
                    </div>
                :
                    page.show.localeCompare("dots")===0
                    ?
                        <div className={"display-inline-block news-navigation-container-tile text-center"+(page.page===props.currentPage?" selected":"")} onClick={() => props.changePage(page.page)} key={index}>
                            ...
                        </div>
                    :
                        null;
    });

    const moveLeft = (): void => {
        if(props.currentPage-1>0){
            props.changePage(props.currentPage-1);
        }
    }

    const moveRight = (): void => {
        if(props.currentPage+1<=props.totalPages){
            props.changePage(props.currentPage+1);
        }
    }

    return (
        <div>
            <div className="display-inline-block news-navigation-container-tile text-center" onClick={() => moveLeft()}>{"<"}</div>
            {availablePages()}
            <div className="display-inline-block news-navigation-container-tile text-center" onClick={() => moveRight()}>{">"}</div>
        </div>
    );
}