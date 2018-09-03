import React, { Component } from 'react';

class HearingRoom extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {

    }

    static getDerivedStateFromProps(props, prevState) {
        return null;
    }

    render() {
        return (
            <div>
                <h1>Hearing Room Appointment</h1>
            </div>
        )
    }
}

export default HearingRoom;