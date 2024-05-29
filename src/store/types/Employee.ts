export interface Employee{
    id? : number,
    name: string;
    salary: number;
    department: string;
}

export interface EmployeeWindow{
    start: number,
    windowSize: number;
}

export interface CreateEmployeeResponseTemplate{
    status: string;
    data: Employee
}