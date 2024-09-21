import { AxiosRequestConfig } from "axios";

import "../interceptor";
import { Service } from ".";
import { BuildUrl } from "./utils";
 
export class AuthService extends Service {
    constructor(config?: AxiosRequestConfig) {
        super(config);
    }
    async verify_user_password(password: string) {
        this.url = new BuildUrl().server('/verify-password')
        this.axiosPost({password}); 
        return this;  
    }
    async reset_password(email: string) {
        this.url = new BuildUrl().server('/reset-password')
        this.axiosPost({email}); 
        return this;  
    }
    async userLogin(email: string, password: string) {
        this.url = new BuildUrl().server('/login')
        this.axiosPost({password}); 
        return this;
    }
    async userLogout() {
        // const { error } = await this.server.auth.signOut()
        // if (error) {
        //     throw new Error(error.message)
        // }
        // return error;
    }
    async isUserActive() {
        // const { session } = (await this.server.auth.getSession()).data
        // return session
    }
    async getActiveUser() {
        // const result = (await this.server.auth.getSession()).data
        // return result
    }
    async getUserId() {
        // const { session } = (await this.server.auth.getSession()).data
        // return session?.user.id
    }
    async getUserDetails(id: string) {
        // const { data, error } = await this.server
        //     .from('user')
        //     .select('*')
        //     .eq('id', id)
        //     .single()
        // return data
    }
    async uploadImage(email: string) {

    }
}

export const fetchUserActiveStatus = async () => {
    // const service = new AuthService();
    // const response = await service.getActiveUser();
    // return response?.user;
    return { name: "Anshad Kt" }
};

export const fetchUserDetails = async () => {
    // const service = new AuthService();

    // const response = await service.getUserDetails((await service.getActiveUser()).session?.user.id!)
    // return response
    return true
}