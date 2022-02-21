declare namespace Express {
    export interface Request {
        userId: string;
        iat: number;
        exp: number;

    }
}