import { Injectable } from "@angular/core";
// import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { getToken } from "./auth";
import { Capability, CreatedCapability } from "../models/capability";
import { API_URL } from "../constants";

const httpOptions = () => {
    const token = getToken();
    const authHeaders =  token ? { 'x-access-token': token } : {};

    return {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            ...authHeaders
        })
    }
}
const patchHttpOptions = () => {
    const token = getToken();
    const authHeaders =  token ? { 'x-access-token': token } : {};

    return {
        headers: new HttpHeaders({
            'Content-Type': 'application/merge-patch+json',
            ...authHeaders
        })
    }
}
@Injectable({
    providedIn: 'root'
})
export class CapabilityService {
    url: string = API_URL;
    capabilityURL: string = `${this.url}/capability`

    constructor(private http: HttpClient) { }

    getCapabilities() {
        return this.http.get<CreatedCapability[]>(this.capabilityURL, httpOptions())
    }

    createCapability(capability: Capability) {
        return this.http.post<Capability>(this.capabilityURL, capability, httpOptions())
    }
    updateCapability(capability: Capability, id: string) {
        return this.http.patch<Capability>(`${this.capabilityURL}/${id}`, capability, patchHttpOptions())
    }
    deleteCapability(id: string) {
        return this.http.delete<CreatedCapability>(`${this.capabilityURL}/${id}`, httpOptions())
    }

    getCapabilityById(id: string) {
        return this.http.get<CreatedCapability>(`${this.capabilityURL}/${id}`, httpOptions())
    }


    isCapabilityNameAvaliable(name: string) {
        return this.http.get<any>(`${this.capabilityURL}/name/${name}`, httpOptions());
    }
}
