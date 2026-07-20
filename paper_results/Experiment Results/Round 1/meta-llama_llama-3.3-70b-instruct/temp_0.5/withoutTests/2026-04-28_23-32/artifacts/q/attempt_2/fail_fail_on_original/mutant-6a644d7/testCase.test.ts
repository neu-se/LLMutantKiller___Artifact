import { Q } from "../q.js";

describe('Q.race', () => {
    it('should resolve with the value of the first promise that is resolved', () => {
        const promise1 = Q.delay(100).then(() => 'promise1');
        const promise2 = Q.delay(50).then(() => 'promise2');
        return Q.race([promise1, promise2]).then((value: string) => {
            expect(value).toBe('promise2');
        });
    });
});