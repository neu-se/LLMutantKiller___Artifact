import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle error', () => {
        const error = new Error('Test error');
        const promise = Q.reject(error);
        const result = promise.catch((err: any) => {
            expect(err).toBe(error);
        });
        return result;
    });
});