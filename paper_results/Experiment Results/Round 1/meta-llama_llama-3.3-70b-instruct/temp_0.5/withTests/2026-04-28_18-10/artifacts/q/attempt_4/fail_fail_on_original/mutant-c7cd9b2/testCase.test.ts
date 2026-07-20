import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
    it('should correctly handle error', () => {
        const error = new Error("Test Error");
        const promise = Q.reject(error);
        return promise.then(null, (err) => {
            expect(err.message).toBe("Test Error");
        });
    });
});