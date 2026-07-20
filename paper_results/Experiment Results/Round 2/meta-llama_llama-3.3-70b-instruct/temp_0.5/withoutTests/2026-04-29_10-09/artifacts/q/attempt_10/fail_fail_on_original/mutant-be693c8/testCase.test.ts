import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should reject the promise after the specified timeout', (done) => {
        const promise = Q((resolve: (value: any) => void, reject: (reason: any) => void) => {
            setTimeout(() => {
                resolve();
            }, 100);
        });
        const timeoutPromise = promise.timeout(50);

        timeoutPromise.then((value: any) => {
            expect(value).toBeUndefined();
            done();
        }).catch((error: any) => {
            expect(error).toBeInstanceOf(Error);
            expect(error.code).toBe('ETIMEDOUT');
            done();
        });
    });
});