import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call catch method', () => {
        const error = new Error('Test error');
        const promise = Q.reject(error);
        promise.catch((err) => {
            expect(err).toBe(error);
        });
    });
});