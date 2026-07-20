import { Q } from '../../../q';

describe('Promise.prototype.thenReject', () => {
    it('should reject the promise with the given reason', () => {
        const promise = Q.delay(10).thenReject('Test reason');
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