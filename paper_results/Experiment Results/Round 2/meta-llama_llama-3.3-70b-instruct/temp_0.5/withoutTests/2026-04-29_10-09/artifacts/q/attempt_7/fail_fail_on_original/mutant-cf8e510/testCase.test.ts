import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle promise rejection correctly', (done) => {
        const promise = Q.reject('error');

        promise.catch((error: any) => {
            expect(error).toBe('error');
            done();
        });
    });
});