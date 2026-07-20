import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should reject the promise when thenReject is called with a reason', () => {
        const promise = Q.resolve();
        const rejectedPromise = promise.thenReject(new Error('Test error'));
        rejectedPromise.then(
            () => {
                throw new Error('Promise should be rejected');
            },
            (error: any) => {
                expect(error).toBeInstanceOf(Error);
            }
        );
    });
});