import { Q } from "../../../q";

describe('Q.any', () => {
    it('should resolve with the first fulfilled promise', (done) => {
        const promise1 = Q.delay(100, 'first');
        const promise2 = Q.delay(50, 'second');
        const promise3 = Q.delay(200, 'third');
        Q.any([promise1, promise2, promise3]).then((value) => {
            expect(value).toBe('second');
            done();
        });
    });
});