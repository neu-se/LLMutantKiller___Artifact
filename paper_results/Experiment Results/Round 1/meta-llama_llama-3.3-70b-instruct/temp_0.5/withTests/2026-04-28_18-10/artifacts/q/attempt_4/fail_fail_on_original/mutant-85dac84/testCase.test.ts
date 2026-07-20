import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Promise.prototype.thenReject', () => {
    it('should reject the promise with the given reason', () => {
        const promise = Q(10).then(() => { throw 'Test reason'; });
        return promise.then(
            () => {
                expect(true).toBe(false);
            },
            (reason: any) => {
                expect(reason).toBe('Test reason');
            }
        );
    });
});