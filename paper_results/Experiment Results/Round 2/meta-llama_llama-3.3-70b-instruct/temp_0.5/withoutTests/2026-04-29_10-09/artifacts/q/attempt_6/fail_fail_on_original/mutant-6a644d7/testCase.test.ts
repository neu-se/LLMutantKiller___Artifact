import { Q } from "../../../../../q.js";

describe('Q.race', () => {
    it('should resolve with the first fulfilled promise', (done) => {
        const promise1 = Q.delay(100, 'first');
        const promise2 = Q.delay(50, 'second');
        Q.race([promise1, promise2]).then((value) => {
            expect(value).toBe('second');
            done();
        });
    });
});