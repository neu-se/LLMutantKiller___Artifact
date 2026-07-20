import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Promise.prototype.thenReject', () => {
    it('should reject the promise with the given reason on the original code and fail on the mutated code', () => {
        const promise = Q.delay(10);
        // Check if thenReject is a function
        expect(typeof promise.thenReject).toBe('function');
        // Check if thenReject rejects the promise
        promise.thenReject('Test reason').then(
            () => {
                expect(true).toBe(false);
            },
            (reason: any) => {
                expect(reason).toBe('Test reason');
            }
        );
    });
});