import React, { useState, useEffect } from 'react'
import API from "../utils/api"

const Table = () => {
    const [data, setData] = useState([])
    const [permanent, setPermanent] = useState([])

    useEffect(() => {
        search()
    }, [])

    const search = () => {
        // e.preventDefault()
        API.randomUsers()
            .then(res => {
                setPermanent(res.data.results);
                console.log(res.data.results)
                setData(res.data.results);
            })
            .catch(err => console.log(err))
    }

    const filter = (event) => {
        let keyword = event.target.value.toLowerCase()
        // console.log(permanent)
        let sortedArr = data.filter(index => index.name.first.toLowerCase().includes(keyword))
        setPermanent(sortedArr)
    }

    const sort = () => {
        let sorted = data.sort(function(a, b) {
            var nameA = a.name.first.toLowerCase();
            var nameB = b.name.first.toLowerCase();

            if(nameA < nameB){
                return -1;
            }

            if(nameA > nameB){
                return 1;
            }

            return 0;
        })
        setPermanent(sorted)
    }
    return (
        <div>
            <input onChange={filter} placeholder="Search Employees"></input>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Picture</th>
                        <th scope="col" onClick={sort}>Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Email</th>
                        <th scope="col">location</th>
                    </tr>
                </thead>
                <tbody>
            {permanent.map(element => (
                <>
                    <tr>
                        <td><img src={element.picture.thumbnail}></img></td>
                        <td>{element.name.first} {element.name.last}</td>
                        <td>{element.phone}</td>
                        <td>{element.email}</td>
                        <td>{element.location.city}</td>
                    </tr>
                </>
            ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table
