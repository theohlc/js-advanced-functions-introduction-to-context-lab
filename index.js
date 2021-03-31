// Your code here
function createEmployeeRecord(employeeArray) {
    let employeeObj = {
        firstName:      employeeArray[0],
        familyName:     employeeArray[1],
        title:          employeeArray[2],
        payPerHour:     employeeArray[3],
        timeInEvents:                 [],
        timeOutEvents:                []
    }
    return employeeObj
}

function createEmployeeRecords(employeesArray) {
    return employeesArray.map(createEmployeeRecord)
}

function createTimeInEvent(employeeObj, timeStr) {
    employeeObj.timeInEvents.push({
        type: "TimeIn",
        date: timeStr.split(" ")[0],
        hour: parseInt(timeStr.split(" ")[1])
    })

    return employeeObj
}

function createTimeOutEvent(employeeObj, timeStr) {
    employeeObj.timeOutEvents.push({
        type: "TimeOut",
        date: timeStr.split(" ")[0],
        hour: parseInt(timeStr.split(" ")[1])
    })

    return employeeObj
}

function hoursWorkedOnDate(employeeObj, date) {
    let timeIn  = employeeObj.timeInEvents.filter(e => e.date == date)[0];
    let timeOut = employeeObj.timeOutEvents.filter(e => e.date == date)[0];
    return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(employeeObj, date) {
    return (hoursWorkedOnDate(employeeObj, date)*employeeObj.payPerHour)
}

function allWagesFor(employeeObj) {
    let datesWorked = employeeObj.timeInEvents.map(function(timeInEvent) {
        return timeInEvent.date
    })
    return datesWorked.reduce(function(memo, date) {
        return memo + wagesEarnedOnDate(employeeObj, date)
    }, 0)
}

function calculatePayroll(employeesArray) {
    return employeesArray.reduce(function(memo, employeeObj) {
        return memo + allWagesFor(employeeObj)
    }, 0)
}

function findEmployeeByFirstName(employees, firstName) {
    return employees.find(function(employee){
        return employee.firstName == firstName
    })
}