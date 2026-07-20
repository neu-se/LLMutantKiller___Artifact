import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should reject the promise after the specified timeout', () => {
        const promise = Q.timeout(Q.resolve('test'), 100, 'Timeout error');
        let resolvedValue: any;
        promise.then((value) => {
            resolvedValue = value;
        }, (error) => {
            expect(error.message).toBe('Timeout error');
        });
        // If the promise is not cleared, the timeout will still be triggered
        // and the error will be thrown
        expect(resolvedValue).toBe('test');
    });
});