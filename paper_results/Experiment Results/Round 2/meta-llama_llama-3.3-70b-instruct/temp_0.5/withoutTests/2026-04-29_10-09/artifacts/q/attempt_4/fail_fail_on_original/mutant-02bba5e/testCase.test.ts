import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not throw an error when trying to access the stack property of a null error', () => {
        const promise = Q.reject(null);
        const error = promise.catch((error: any) => {
            expect(() => error.stack).not.toThrowError();
        });
        return error;
    });
});