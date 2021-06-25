//make a new component
//have a text field (HTML element)
//let user type in their name into the text field
//then, we'll display a message welcoming them back

//create a React component that will be called my the DOM
import React from 'react'; //React is a js file that is being imported for later reference

class Username extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userNameInput: "no name yet"
        }
    }

    //never do this.state.key = <some value> to change state
    //instead, write a handler function;
    //on change (within the HTML) execute the handler function

    handleNameChange(name) {
        this.setState({
            userNameInput: name,
        })
    }



    render() {
        return (
            <div>
                <div>Enter your Name:
                    <input type="text" size="10" onChange={(event) => {
                        this.handleNameChange(event.target.value)
                    }}/>
                    <div><button></button></div>
                </div>
                <div>Welcome Back, {this.state.userNameInput} </div>
            </div>
        )
    }


}

export default Username