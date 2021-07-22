import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getJokes } from '../../store/actions/jokesActions';
import Skeleton from '@material-ui/lab/Skeleton';

import './Jokes.scss';

export const  Jokes = () => {
    const dispatch = useDispatch();
    const jokesListData = useSelector(state => state.jokesList);
    const {loading, error, jokes}  = jokesListData;


    useEffect(() => {
        dispatch(getJokes())    
    }, [dispatch])

    return (
        <div className="jokes-card-wrapper">
            {loading ?  
                 <div className="row">
                     {[1,2,3,4,5,6,7,8,9,10,11,12].map((load, index) => (
                          <div className="col-lg-3" key={index}>
                               <div className="card-post mb-4 card card-small">
                                 <Skeleton variant="rect" width={333} height={184} />
                                 </div>
                            </div>
            ))}</div> : error ? error.message :
            <div className="row">
                {jokes.map(j => (
                    <div className="col-lg-3" key={j.id}>
                    <div className="card-post mb-4 card card-small">
                       <div className="card-body">
                           <h5 className="card-title">{j.setup}</h5>
                            <p className="card-text text-muted">
                                  In said to of poor full be post face snug. Introduced imprudence see say unpleasing devonshire acceptance son. Exeter longer wisdom work... 
                            </p>       
                        </div>   
                    </div> 
                </div>
                ))}
            </div> 
            }    
        </div>
    )
}

export default Jokes;
