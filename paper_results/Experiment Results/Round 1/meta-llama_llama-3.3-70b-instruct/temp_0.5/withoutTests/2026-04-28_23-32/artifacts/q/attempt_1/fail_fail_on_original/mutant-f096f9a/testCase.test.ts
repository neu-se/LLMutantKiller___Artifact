import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.any', () => {
    it('should resolve with the first fulfilled promise', () => {
        const promise1 = Q.delay(100).then(() => 'first');
        const promise2 = Q.delay(50).then(() => 'second');
        return Q.any([promise1, promise2]).then((result) => {
            expect(result).toBe('second');
        });
    });

    it('should reject if all promises are rejected', () => {
        const promise1 = Q.delay(100).then(() => { throw new Error('first'); });
        const promise2 = Q.delay(50).then(() => { throw new Error('second'); });
        return Q.any([promise1, promise2]).catch((error) => {
            expect(error.message).toBe('Q can\'t get fulfillment value from any promise, all promises were rejected. Last error message: second');
        });
    });

    it('should resolve with the first fulfilled promise even if there are multiple fulfilled promises', () => {
        const promise1 = Q.delay(100).then(() => 'first');
        const promise2 = Q.delay(50).then(() => 'second');
        const promise3 = Q.delay(200).then(() => 'third');
        return Q.any([promise1, promise2, promise3]).then((result) => {
            expect(result).toBe('second');
        });
    });
});