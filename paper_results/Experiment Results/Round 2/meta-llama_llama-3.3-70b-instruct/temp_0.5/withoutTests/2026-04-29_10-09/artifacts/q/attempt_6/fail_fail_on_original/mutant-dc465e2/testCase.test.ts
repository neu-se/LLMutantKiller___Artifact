import { Q } from "../../../q.js";

describe('Q', () => {
    it('should reject the promise after the specified timeout', (done) => {
        const promise = Q.timeout(Q.resolve('test'), 100, 'Timeout error');
        let rejected = false;
        promise.then(() => {
            rejected = true;
        }, (error) => {
            expect(error).toBe('Timeout error');
            done();
        });
        setTimeout(() => {
            expect(rejected).toBe(false);
            done();
        }, 200);
    });
});