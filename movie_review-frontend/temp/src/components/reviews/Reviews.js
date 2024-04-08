
import { useEffect,useRef} from "react";
import {useParams} from 'react-router-dom';
import { useState } from 'react';

import {Container,Row,Col} from 'react-bootstrap';
import axios from "axios";
import ReviewForm from "../reviewForm/ReviewForm";

import React from 'react';

const Reviews = ({getMovieData,movie}) => {
    
    const revText=useRef();
    let param=useParams();
    const [reviews,setReviews]=useState([]);
    const movieId=param.movieId;
    useEffect(()=>{
        getMovieData(movieId);

    },[]);
    const addReview=async (e)=>{
        e.preventDefault();
        const rev=revText.current;
        try{
            const response=await axios.post("http://localhost:8080/api/v1/reviews",{reviewBody:rev.value,imdbId:movieId});
            

           // const updateReviews=[...reviews,response.data.body];
            const updateReviews = [...(reviews || []), response.data.body];
            console.log("rev"+updateReviews);

            rev.value="";
            setReviews(updateReviews);
        }catch(err){
            console.log(err);
        }
      
    }
  return (
   <Container>
    <Row>
        <Col><h3>Reviews</h3>
        </Col>
    </Row>
    <Row className="mt-2">
        <Col>
        <img src={movie?.poster} alt=""/>
        </Col>
        <Col>
        {
            <>
            <Row>
                <Col>
                <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?"/>
                </Col>
            </Row>
            <Row>
                <Col>
                <hr/>
                </Col>
            </Row>
            </>
        }
        {
            reviews?.map((r)=>{
                return(
                    <>
                    <Row>
                        <Col>
                        {r}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <hr/>
                        </Col>
                    </Row>
                    </>
                )
            })
        }
        </Col>
    </Row>
    <Row>
        <Col>
        <hr/>
        </Col>
    </Row>
   </Container>
  )
}

export default Reviews