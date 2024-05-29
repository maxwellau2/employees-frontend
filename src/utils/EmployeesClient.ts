import axios, { AxiosError,AxiosInstance, AxiosResponse } from "axios"

interface CustomResponse{
    statusCode: number;
    data: any;
}

export class EmployeesClient{
    baseuri : string = "http://localhost:3000/"
    client : AxiosInstance;
    constructor(){
        this.client = axios.create({baseURL: this.baseuri, timeout: 5000});
    }

    private handleError(e: any): CustomResponse {
        console.log(this.baseuri)
        if (axios.isAxiosError(e)) {
            console.log("Axios Error encountered");
            if (!e.response) {
                console.log("No Response Recovered");
                return { statusCode: 400, data: { message: "No response from server" } };
            } else {
                console.log(e.response.status, e.response.data);
                return { statusCode: e.response.status, data: e.response.data };
            }
        } else {
            console.log("Non Axios Error", e);
            return { statusCode: 500, data: { message: "Non Axios Error", error: e.message } };
        }
    }

    private async Get(endpoint: string, params: object | null, body: object | null): Promise<CustomResponse> {
        try {
            let result: AxiosResponse = await this.client.get(endpoint, { params: params, data: body });
            console.log(result.status, result.data);
            return { statusCode: result.status, data: result.data };
        } catch (e: any) {//
            return this.handleError(e);
        } finally {
            console.log("exiting");
        }
    }

    private async Post(endpoint: string, params: object | null, body: object | null): Promise<CustomResponse> {
        try {
            let result: AxiosResponse = await this.client.post(endpoint, body);
            console.log(result.data, result.status);
            return { statusCode: result.status, data: result.data };
        } catch (e: any) {
            return this.handleError(e);
        } finally {
            console.log("exiting");
        }
    }

    private async Put(endpoint: string, params: object | null, body: object | null): Promise<CustomResponse>{
        try{
            let result: AxiosResponse = await this.client.put(endpoint, body);
            console.log(result.data, result.status);
            return {statusCode:result.status, data:result.data};
        } catch (e: any){
            return this.handleError(e);
        } finally{
            console.log("exiting");
        }
    }

    private async Delete(endpoint: string, params: object | null, body: object | null): Promise<CustomResponse>{
        try{
            let result: AxiosResponse = await this.client.delete(endpoint);
            console.log(result.data, result.status);
            return {statusCode:result.status, data:result.data};
        } catch (e: any){
            return this.handleError(e);
        } finally{
            console.log("exiting");
        }
    }

    public async GetAllEmployees(){
        return await this.Get("employee", null, null);
    }

    public async GetEmployeeByID(id:number){
        // let params = {emp_id: id}
        return await this.Get(`employee/${id}`, null, null)
    }

    public async CreateNewEmployee(name:string, salary:number, department:string){
        let body = {
            name,
            salary,
            department
        }
        return await this.Post("employee", null, body);
    }

    public async ModifyEmployee(id: number, name:string, salary:number, department:string){
        let body = {
            name,
            salary,
            department
        }
        return await this.Put(`employee/${id}`, null, body);
    }

    public async DeleteEmployee(id: number){
        return await this.Delete(`employee/${id}`, null, null)
    }
}

// async function main() {
//     let client = new EmployeesClient();
//     // let result = await client.GetAllEmployees();
//     // console.log(result);

//     // result = await client.GetEmployeeByID(9);
//     // console.log(result);
//     // let result = await client.CreateNewEmployee("jacob pinto", 999, "penis");
//     // let result = await client.ModifyEmployee(15, "maxwell", 999, "PS");
//     let result = await client.DeleteEmployee(9);
//     console.log(result)
// }

// main()