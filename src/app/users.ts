export class Users {
    public Id: number;
    public name: string;
    public pwd: string;
    public email: string;
    public rol: string;

    constructor(Id: number, name: string, pwd: string, email: string, rol: string) {
        this.Id = Id;
        this.name = name;
        this.pwd = pwd;
        this.email = email;
        this.rol = rol;
    }
}