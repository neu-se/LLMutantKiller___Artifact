import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should clear the timeout when the promise is resolved', (done) => {
        const promise = Q.timeout(Q.resolve('test'), 100, new Error('Timeout error'));
        let error: any;
        promise.catch((err: any) => {
            error = err;
        });
        setTimeout(() => {
            expect(error).toBeUndefined();
            done();
        }, 150);
    });
});