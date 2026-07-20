import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.all', () => {
    it('should resolve with an array of values when all promises are fulfilled', () => {
        const promise1 = Q.resolve(1);
        const promise2 = Q.resolve(2);
        const promise3 = Q.resolve(3);

        return Q.all([promise1, promise2, promise3]).then((values: any[]) => {
            expect(values).toEqual([1, 2, 3]);
        });
    });

    it('should reject with the reason of the first rejected promise', () => {
        const promise1 = Q.resolve(1);
        const promise2 = Q.reject('Error');
        const promise3 = Q.resolve(3);

        return Q.all([promise1, promise2, promise3]).then(() => {
            expect(true).toBe(false); // This should not be called
        }).catch((error: any) => {
            expect(error).toBe('Error');
        });
    });

    it('should resolve with an array of values when some promises are already fulfilled', () => {
        const promise1 = Q.resolve(1);
        const promise2 = 2; // Already fulfilled
        const promise3 = Q.resolve(3);

        return Q.all([promise1, promise2, promise3]).then((values: any[]) => {
            expect(values).toEqual([1, 2, 3]);
        });
    });
});