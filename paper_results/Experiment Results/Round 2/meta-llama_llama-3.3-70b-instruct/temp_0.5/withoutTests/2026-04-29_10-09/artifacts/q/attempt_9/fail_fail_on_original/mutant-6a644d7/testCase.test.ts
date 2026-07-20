import { Q } from "../../../../../q.js";

describe('Q.race', () => {
    it('should return a promise that resolves when one of the input promises resolves', (done) => {
        const promise1 = Q.delay(100, 'first');
        const promise2 = Q.delay(50, 'second');
        const result = Q.race([promise1, promise2]);
        result.then((value) => {
            expect(value).toBe('second');
            done();
        });
    });
});