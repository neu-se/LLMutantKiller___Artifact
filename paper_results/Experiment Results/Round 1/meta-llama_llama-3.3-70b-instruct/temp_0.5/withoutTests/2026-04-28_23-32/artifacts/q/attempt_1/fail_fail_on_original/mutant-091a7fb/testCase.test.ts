import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.any', () => {
    it('should resolve with the first fulfilled promise', () => {
        const promise1 = Q.delay(100).then(() => 'promise1');
        const promise2 = Q.delay(50).then(() => 'promise2');
        const promise3 = Q.reject('error');

        return Q.any([promise1, promise2, promise3]).then((value) => {
            expect(value).toBe('promise2');
        });
    });
});