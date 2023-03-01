export class Users {
    public id: number;
    public name: string;
    public password: string;
    public email: string;
    public rol: string;
    public avatar: string;


    constructor(id: number, name: string, password: string, email: string, rol: string, avatar: string) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.email = email;
        this.rol = rol;
        this.avatar = avatar;

    }
}