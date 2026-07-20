import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should reject the promise when thenReject is called with a reason', () => {
        const promise = Q.resolve();
        const rejectedPromise = promise.thenReject(new Error('Test error'));
        expect(() => rejectedPromise.then(() => {})).toThrowError();
    });
});