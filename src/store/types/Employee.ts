export interface Employee{
    id? : number,
    name: string;
    salary: number;
    department: string;
}

export interface EmployeeWindow{
    pageNumber: number,
    windowSize: number;
}

export interface CreateEmployeeResponseTemplate{
    status: string;
    data: Employee
}

export interface EmployeeWindowReturn{
    totalEmployees: number,
    employees: Employee[],
}