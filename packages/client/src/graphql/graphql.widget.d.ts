
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface AuthReturnData {
    tokenData: TokenData;
    user: User;
}

export interface Comment {
    created: DateTime;
    id: string;
    memory: Memory;
    message: string;
    user: User;
}

export interface Memory {
    comments: Comment[];
    created: DateTime;
    description: string;
    id: string;
    name: string;
    user: User[];
}

export interface IMutation {
    addComment(memoryId: string, message: string): Comment | Promise<Comment>;
    changePassword(password: string, token: string): User | Promise<User>;
    createMemory(description: string, name: string): Memory | Promise<Memory>;
    forgotPassword(email: string): boolean | Promise<boolean>;
    login(email: string, password: string): AuthReturnData | Promise<AuthReturnData>;
    signup(confirmPassword: string, email: string, password: string): AuthReturnData | Promise<AuthReturnData>;
    updateUser(email: string, name: string): boolean | Promise<boolean>;
}

export interface IQuery {
    allMemories(limit?: number, page?: number): Memory[] | Promise<Memory[]>;
    getMemoryById(id: string): Memory | Promise<Memory>;
    me(): User | Promise<User>;
}

export interface ISubscription {
    commentAdded(): Comment | Promise<Comment>;
}

export interface TokenData {
    expiresAt: number;
    token: string;
}

export interface User {
    comments: Comment[];
    email: string;
    id: string;
    memories: Memory[];
    name: string;
}

export type DateTime = any;
