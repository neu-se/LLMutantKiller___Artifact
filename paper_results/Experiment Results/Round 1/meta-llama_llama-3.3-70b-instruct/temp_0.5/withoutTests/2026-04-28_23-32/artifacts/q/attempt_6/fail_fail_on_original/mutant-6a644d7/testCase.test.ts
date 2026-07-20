import { Q } from "../q.js";

describe('Q.race', () => {
    it('should return a promise that resolves to the first resolved value', () => {
        const promise1 = Q.delay(100).then(() => 'promise1');
        const promise2 = Q.delay(50).then(() => 'promise2');
        return Q.race([promise1, promise2]).then((value) => {
            expect(value).toBe('promise2');
        });
    });
});