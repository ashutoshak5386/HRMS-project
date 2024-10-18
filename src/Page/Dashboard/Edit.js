import React, { useState } from 'react'
import Swal from 'sweetalert2';

function Edit({ employees, selectedEmployee, setEmployees, setIsEditing }) {
    const id = selectedEmployee.id;

    const [firstName, setFirstName] = useState(selectedEmployee.firstName);
    const [lastName, setLastName] = useState(selectedEmployee.lastName);
    const [email, setEmail] = useState(selectedEmployee.email);
    const [salary, setSalary] = useState(selectedEmployee.salary);
    const [date, setDate] = useState(selectedEmployee.date);

    // New fields for payroll processing
    const [hourlyRate, setHourlyRate] = useState(selectedEmployee.hourlyRate);
    const [fixedSalary, setFixedSalary] = useState(selectedEmployee.fixedSalary);
    const [commission, setCommission] = useState(selectedEmployee.commission);
    const [taxRate, setTaxRate] = useState(selectedEmployee.taxRate);

    const handleUpdate = e => {
        e.preventDefault();

        if (!firstName || !lastName || !email || !salary || !date) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true
            });
        }

        const employee = {
            id,
            firstName,
            lastName,
            email,
            salary,
            hourlyRate,
            fixedSalary,
            commission,
            taxRate,
            date
        };

        for (let i = 0; i < employees.length; i++) {
            if (employees[i].id === id) {
                employees.splice(i, 1, employee);
                break;
            }
        }

        setEmployees(employees);
        setIsEditing(false);

        Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: `${employee.firstName} ${employee.lastName}'s data has been updated.`,
            showConfirmButton: false,
            timer: 1500
        });
    };

    return (
        <div className="small-container">
            <form onSubmit={handleUpdate}>
                <h1>Edit Employee</h1>
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" type="text" name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} />
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" type="text" name="lastName" value={lastName} onChange={e => setLastName(e.target.value)} />
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                <label htmlFor="salary">Salary ($)</label>
                <input id="salary" type="number" name="salary" value={salary} onChange={e => setSalary(e.target.value)} />
                <label htmlFor="date">Date</label>
                <input id="date" type="date" name="date" value={date} onChange={e => setDate(e.target.value)} />

                {/* New fields for Payroll */}
                <label htmlFor="hourlyRate">Hourly Rate</label>
                <input id="hourlyRate" type="number" name="hourlyRate" value={hourlyRate} onChange={e => setHourlyRate(e.target.value)} />
                <label htmlFor="fixedSalary">Fixed Salary</label>
                <input id="fixedSalary" type="number" name="fixedSalary" value={fixedSalary} onChange={e => setFixedSalary(e.target.value)} />
                <label htmlFor="commission">Commission</label>
                <input id="commission" type="number" name="commission" value={commission} onChange={e => setCommission(e.target.value)} />
                <label htmlFor="taxRate">Tax Rate (%)</label>
                <input id="taxRate" type="number" name="taxRate" value={taxRate} onChange={e => setTaxRate(e.target.value)} />

                <div style={{ marginTop: '30px' }}>
                    <input type="submit" value="Update" />
                    <input style={{ marginLeft: '12px' }} className="muted-button" type="button" value="Cancel" onClick={() => setIsEditing(false)} />
                </div>
            </form>
        </div>
    );
}

export default Edit;
