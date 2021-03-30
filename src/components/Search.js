import React from "react";

function Search(props) {
    return (
        <form>
            <div className="form-group">
                <p>Type to search names from the list below:</p>

                <input className="form" placeholder="Search Name" 
                    value = {props.search}
                    onChange = {props.handleSearchChange}
                    type= "text"
                />
            </div>
        </form>
    )
}

export default Search;