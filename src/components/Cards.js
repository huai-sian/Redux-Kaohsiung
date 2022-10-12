import { useState, useEffect } from "react";

import './Cards.css'

export default function Cards({ data, selected }) {
    const [page, setPage] = useState(1)
    const [nowPage, setNowPage] = useState(1)
    const [pageArray, setPageArray] = useState([])

    useEffect(() => {
        setPage(data.length)
        let tempArr = [];
        for(let i = 1;i <= page;i++) {
            tempArr.push(i);
        }
        setPageArray(tempArr);
        
    }, [data, page]);

    useEffect(() => {
        setNowPage(1)
    }, [selected]);

    if(data.length === 0) {
        return (<div className="error">No data to load...</div>)
    }
    return (
        <section>
            <div className="row">
                {data && data[nowPage - 1].map(item => (
                    <div className='col-sm-6 mb-4' key={item.Id}>
                        <div className='card shadow-sm border-0 h-100'>
                            <div className='card-header p-0' style={{height:'155px',overflow: 'hidden'}}>
                                <div className='picture'>
                                    <img src={`${item.Picture1}`} alt={item.Name}></img>
                                </div>
                                <h3>{item.Name}</h3>
                                <h5>{item.Zone}</h5>
                            </div>
                            <div className="card-body">
                                <ul className="list-unstyled mb-0">
                                    <li className='d-flex'>
                                        <div style={{width: '30px'}}><i className="fas fa-clock text-primary"></i></div>
                                        { item.Opentime }
                                    </li>
                                    <li className='d-flex'>
                                        <div style={{width: '30px'}}><i className="fas fa-map-marker text-warning"></i></div>
                                        { item.Add }
                                    </li>
                                    <li className='d-flex'>
                                        <div style={{width: '30px'}}><i className="fas fa-mobile-alt text-info"></i></div>
                                        { item.Tel }
                                    </li>
                                    <li className='d-flex' v-if='item.Ticketinfo'>
                                        <div style={{width: '30px'}}><i className="fas fa-ticket-alt text-success"></i></div>
                                        { item.Ticketinfo} 
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}  
                </div>
                <div className="pages my-5">
                    <ul className="pagination justify-content-center">
                        <li className="page-item">
                            <a  
                                onClick={() => setNowPage(prev => prev -1 )}
                                className={`page-link ${nowPage === 1 ? 'disabled' : ''}`}
                                >Previous</a>
                        </li>
                        {pageArray.map(item => (
                            <li key={item} className={`page-item ${nowPage === item? 'active' : ''}`}>
                                <a className="page-link" onClick={() => setNowPage(item)}>{item}</a>
                            </li>
                        ))}
                        <li className="page-item">
                            <a  
                                onClick={() => setNowPage(prev => prev +1 )}
                                className={`page-link ${nowPage === page ? 'disabled' : ''}`}
                                >Next</a>
                        </li>
                    </ul>
                </div>
            </section>
    )
}
