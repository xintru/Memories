
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export abstract class IQuery {
    abstract user(): User | Promise<User>;
}

export abstract class IMutation {
    abstract login(email?: string): string | Promise<string>;
}

export class User {
    id: string;
    email: string;
}
