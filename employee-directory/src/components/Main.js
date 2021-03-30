import React, { Component } from "react"
import Header from "./Header";
// import Search from "./Search";
import Body from "./Body";
import API from "../utils/API"

class Main extends Component {

    state = {
        users: [],
        search: "",
    }

    componentDidMount = () => {
        API.getUsers()
            .then(res => {
                console.log(res.data)
                const newUser = res.data.results;
                const userSorted = []
                // console.log(newUser)

                for (let i = 0; i < newUser.length; i++) {
                    const userInfo = {
                        image: newUser[i].picture.medium,
                        firstName: newUser[i].name.first,
                        lastName: newUser[i].name.last,
                        age: newUser[i].dob.age,
                        email: newUser[i].email,
                        cell: newUser[i].cell
                    }
                    userSorted.push(userInfo)
                }
                this.setState({ users: userSorted })
            })
    }

    //function to update search state when user type in a word
    handleSearchChange = event => {
        this.setState({ search: event.target.value })
    };

    //function to filter the list of users
    filterUsers() {
        const search = this.state.search.toLowerCase();
        
        return this.state.users.filter(user => {
            return (
                user.firstName.toLowerCase().includes(search) ||
                user.lastName.toLowerCase().includes(search)
            )
        })
    }

    sort(){
        console.log(this.state.users)
        const sortUsers = this.state.users.sort((a, b)=> a.firstName.toLowerCase()> b.firstName.toLowerCase() ? 1 : -1)
        this.setState({users: sortUsers})
    }

    backwards(){
        console.log(this.state.users)
        const sortUsers = this.state.users.sort((a, b)=> b.firstName.toLowerCase()> a.firstName.toLowerCase() ? 1 : -1)
        this.setState({users: sortUsers})
    }

    //function to render a table of users
    renderTableData = () => {
        return this.filterUsers().map((user, index) => {
            const { image, firstName, lastName, age, email, cell } = user 
            return (
                <tr key={index}>
                    <td><img src={image} alt="userImage" /></td>
                    <td>{firstName} {lastName}</td>
                    <td>{age}</td>
                    <td>{email}</td>
                    <td>{cell}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="container">
                <Header />
                <div className="mb-2">Sort the list by: {" "}
                    <button onClick={this.sort.bind(this)} className="btn btn-outline-info">A-Z</button> {" "}
                    <button onClick={this.backwards.bind(this)} className="btn btn-outline-info">Z-A</button> {" "}
                </div>
                <div>
                    <table id='users' className="table">
                        <Body/>
                        <tbody className="border border-primary t-2 pb-2">
                            {this.renderTableData()}
                        </tbody>
                    </table>
                </div>

                
            </div>
        )
    }
}

export default Main;