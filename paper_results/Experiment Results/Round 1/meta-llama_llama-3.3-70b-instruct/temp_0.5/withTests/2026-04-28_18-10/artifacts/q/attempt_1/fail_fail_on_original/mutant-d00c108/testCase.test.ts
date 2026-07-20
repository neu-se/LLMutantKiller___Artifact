import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.race function', () => {
    it('should resolve with the first fulfilled promise', () => {
        const promise1 = Q.delay(100).then(() => 'promise1');
        const promise2 = Q.delay(50).then(() => 'promise2');
        return Q.race([promise1, promise2]).then((value) => {
            expect(value).toBe('promise2');
        });
    });

    it('should reject with the first rejected promise', () => {
        const promise1 = Q.delay(100).then(() => { throw new Error('promise1'); });
        const promise2 = Q.delay(50).then(() => { throw new Error('promise2'); });
        return Q.race([promise1, promise2]).then(() => {
            expect(true).toBe(false);
        }, (error) => {
            expect(error.message).toBe('promise2');
        });
    });
});