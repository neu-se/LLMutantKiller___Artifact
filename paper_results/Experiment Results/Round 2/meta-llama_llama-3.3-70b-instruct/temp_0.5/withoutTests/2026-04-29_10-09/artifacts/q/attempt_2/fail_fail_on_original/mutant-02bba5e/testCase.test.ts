import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle error stack traces', () => {
        const promise = Q.reject(new Error('Test error'));
        const error = promise.catch((error) => error);
        expect(error).toBeInstanceOf(Promise);
        return error.then((error: any) => {
            expect(error).toBeInstanceOf(Error);
            expect(error.stack).not.toBeNull();
        });
    });
});