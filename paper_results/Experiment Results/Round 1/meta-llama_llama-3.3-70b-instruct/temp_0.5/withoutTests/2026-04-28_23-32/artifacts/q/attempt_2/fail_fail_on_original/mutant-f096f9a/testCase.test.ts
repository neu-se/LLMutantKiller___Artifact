import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.any', () => {
    it('should reject if all promises are rejected', () => {
        const promise1 = Q.delay(100).then(() => { throw new Error('first'); });
        const promise2 = Q.delay(50).then(() => { throw new Error('second'); });
        return Q.any([promise1, promise2]).catch((error: any) => {
            expect(error.message).toBe('Q can\'t get fulfillment value from any promise, all promises were rejected. Last error message: second');
        });
    });
});