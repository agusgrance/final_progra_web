export class Users {
    public id: number;
    public name: string;
    public pwd: string;
    public email: string;
    public rol: string;
    public avatar: string;


    constructor(id: number, name: string, pwd: string, email: string, rol: string, avatar: string) {
        this.id = id;
        this.name = name;
        this.pwd = pwd;
        this.email = email;
        this.rol = rol;
        this.avatar = avatar;

    }
}