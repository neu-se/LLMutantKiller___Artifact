import { Q } from "../../../q.js";

describe('Q', () => {
    it('should reject the promise after the specified timeout', (done) => {
        const promise = Q.timeout(Q.resolve('test'), 100);
        let resolved = false;
        promise.then((value) => {
            resolved = true;
        });
        setTimeout(() => {
            expect(resolved).toBe(true);
            done();
        }, 150);
    });
});