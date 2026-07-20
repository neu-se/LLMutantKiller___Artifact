import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle error stack traces', () => {
        const error = new Error('Test error');
        const promise = Q.reject(error);
        const result = promise.catch((err: any) => {
            expect(err).toBe(error);
            expect(err.stack).not.toBeNull();
        });
        return result;
    });
});