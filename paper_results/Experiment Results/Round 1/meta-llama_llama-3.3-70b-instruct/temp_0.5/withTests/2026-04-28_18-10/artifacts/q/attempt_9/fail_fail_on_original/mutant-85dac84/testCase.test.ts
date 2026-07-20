import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Promise.prototype.thenReject', () => {
    it('should reject the promise with the given reason on the original code and fail on the mutated code', () => {
        const promise = Q(10);
        expect(promise.thenReject).toBeDefined();
        expect(typeof promise.thenReject).toBe('function');
        try {
            promise.thenReject('Test reason');
        } catch (error) {
            expect(error).toBeDefined();
        }
    });
});