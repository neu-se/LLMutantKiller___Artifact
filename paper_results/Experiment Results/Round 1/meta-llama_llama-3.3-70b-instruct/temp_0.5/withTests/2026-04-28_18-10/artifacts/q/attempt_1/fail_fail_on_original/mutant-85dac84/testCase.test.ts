import { Q } from '../../../../../../../../subject_repositories/q/q';

describe('Promise.prototype.thenReject', () => {
    it('should reject the promise with the given reason', () => {
        const promise = Q.delay(10).thenReject('Test reason');
        return promise.then(
            () => {
                expect(true).toBe(false);
            },
            (reason) => {
                expect(reason).toBe('Test reason');
            }
        );
    });
});