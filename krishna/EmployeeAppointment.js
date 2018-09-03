import React, { Component } from 'react';

class EmployeeAppointment extends Component {
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
                <h1>Employee Appointment</h1>
            </div>
        )
    }
}

export default EmployeeAppointment;