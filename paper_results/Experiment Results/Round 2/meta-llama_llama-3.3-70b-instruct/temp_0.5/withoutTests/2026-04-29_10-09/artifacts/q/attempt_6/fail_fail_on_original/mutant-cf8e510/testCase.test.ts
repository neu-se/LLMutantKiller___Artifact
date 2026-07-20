import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle promise rejection correctly', () => {
        const promise = Q.reject('error');
        let errorCaught = false;

        promise.catch((error: any) => {
            errorCaught = true;
            expect(error).toBe('error');
        });

        // Use a timeout to wait for the promise to be rejected
        setTimeout(() => {
            expect(errorCaught).toBe(true);
        }, 10);
    });
});