import React, { useState } from "react";
import axios from "axios";



    const AddMovie = props => {


        const [addedMovie, setAddedMovie] = useState({
            id: "",
            title: "",
            director: "",
            metascore: "",
            stars: []
        })

        const changeHandler = e => {
            e.persist()
            if(e.target.name === "stars") {
                setAddedMovie({
                    ...addedMovie,
                    [e.target.name]: [e.target.value]
                })
            } else {
                setAddedMovie({
                    ...addedMovie,
                    [e.target.name]: e.target.value
                }) 
            }
        }
    
        const newMovie = {
            id: Date.now(),
            title: addedMovie.title,
            director: addedMovie.director,
            metascore: addedMovie.metascore,
            stars: addedMovie.stars
        }


        const addMoviePost = e => {
            e.preventDefault();
            axios
                .post(`http://localhost:5000/api/movies`, newMovie)
                .then(res => {
                    props.updateMovieList(res.data);
                    props.history.push(`/`);
                })
                .catch(err =>
                    console.log(err)    
                )
        }
        



    return(
        <div>
            <form onSubmit={addMoviePost}>
                <input 
                   type="text"
                   name="title"
                   onChange={changeHandler}
                   placeholder="title"
                   value={addedMovie.title} 
                />
                <input 
                   type="text"
                   name="director"
                   onChange={changeHandler}
                   placeholder="director"
                   value={addedMovie.director} 
                />
                <input 
                   type="number"
                   name="metascore"
                   onChange={changeHandler}
                   placeholder="metascore"
                   value={addedMovie.metascore} 
                />
                <input 
                   type="text"
                   name="stars"
                   onChange={changeHandler}
                   placeholder="stars"
                   value={addedMovie.stars} 
                />
                <button>Submit</button>
            </form>
        </div>
        
    )
}

export default AddMovie;