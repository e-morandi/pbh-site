import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


export interface ServiceRequest
{
    name: string;
    email: string;
    phone: string;
    address: string;
    body: string;
}

export interface ServiceResponse
{
    message: string;
}

@Injectable({providedIn: 'root'})
export class RequestServiceService
{   
    // Eventually change this to production
    private readonly apiUrl = 'http://localhost:3000/api/request-service';

    constructor(private http: HttpClient) {};

    submit(payload: ServiceRequest): Observable<ServiceResponse> {
        return this.http.post<ServiceResponse>(this.apiUrl, payload);
    }
}
