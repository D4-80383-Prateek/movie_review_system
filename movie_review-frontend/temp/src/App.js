import './App.css';
import api from './api/axiosConfig';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Layout from './components/layout';
import Home from './components/home/Home';
import Header from './components/header/Header';
import {Routes,Route} from 'react-router-dom';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';

function App() {

  const [movies,setMovies]=useState([]);
  const [movie,setMovie]=useState();

  const getMovies = async ()=>{

    try{
      const response = await axios.get("http://localhost:8080/api/v1/movies")
      console.log(response.data)
      setMovies(response.data)
    }catch(err){
      console.log(err)
    }

  }
  const getMovieData=async (movieId)=>{
    try{
      const resp=await axios.get(`http://localhost:8080/api/v1/movies/${movieId}`)
      const singleMovie=resp.data;
      setMovie(singleMovie);
      setReviews(singleMovie.reviews);

    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
        getMovies();
  },[])

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route path="/" element={<Home movies={movies}/>} ></Route> 
        <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
        <Route path='/Reviews/:movieId' element={<Reviews getMovieData={getMovieData} movie={movie} />}></Route>
        
        </Route>
      </Routes>
    </div>
  );
}

export default App;
