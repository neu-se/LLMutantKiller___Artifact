import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle promise rejection correctly', () => {
        const promise = Q.reject('error');
        let errorCaught = false;

        promise.catch((error) => {
            errorCaught = true;
            expect(error).toBe('error');
        });

        expect(errorCaught).toBe(false);
    });
});