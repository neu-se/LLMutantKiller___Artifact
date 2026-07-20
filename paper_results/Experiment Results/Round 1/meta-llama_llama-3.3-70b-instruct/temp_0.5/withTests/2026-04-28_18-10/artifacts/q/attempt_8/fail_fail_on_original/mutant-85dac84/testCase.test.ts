import { Q } from "../../../q";

describe('Promise.prototype.thenReject', () => {
    it('should reject the promise with the given reason on the original code and fail on the mutated code', () => {
        const promise = Q.delay(10);
        expect(typeof promise.thenReject).toBe('function');
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