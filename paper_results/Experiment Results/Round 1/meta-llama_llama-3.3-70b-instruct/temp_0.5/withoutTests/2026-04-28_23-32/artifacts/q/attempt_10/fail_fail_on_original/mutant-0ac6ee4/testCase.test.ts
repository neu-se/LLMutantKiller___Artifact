import { Q } from './q.js';

describe('Q', () => {
    it('should create an error with the correct message when a timeout occurs', () => {
        const ms = 100;
        const error = new Error("Timed out after " + ms + " ms");
        const promise = Q.timeout(Promise.resolve(), ms, error);
        return promise.catch((err: any) => {
            expect(err.message).toBe("Timed out after " + ms + " ms");
        });
    });
});