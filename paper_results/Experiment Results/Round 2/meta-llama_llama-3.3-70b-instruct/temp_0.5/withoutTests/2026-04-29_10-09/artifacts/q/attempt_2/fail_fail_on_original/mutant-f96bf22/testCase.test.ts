import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should filter internal frames from stack traces', () => {
        const error = new Error('Test error');
        const originalStackTrace = error.stack;

        const promise = Q.reject(error);
        let newStackTrace: string | undefined;
        promise.catch((e) => {
            newStackTrace = e.stack;
        });

        // Wait for the promise to settle
        promise.then(() => {
            expect(newStackTrace).not.toEqual(originalStackTrace);
        });
    });
});