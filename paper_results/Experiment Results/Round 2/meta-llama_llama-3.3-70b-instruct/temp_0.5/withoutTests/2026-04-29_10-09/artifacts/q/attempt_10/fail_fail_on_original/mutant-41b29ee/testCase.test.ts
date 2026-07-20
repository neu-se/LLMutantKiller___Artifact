import { Q } from "./q.js";

describe('Q.all', () => {
    it('should resolve with an array of values when all promises are fulfilled', () => {
        const promise1 = Q.resolve(1);
        const promise2 = Q.resolve(2);
        const promise3 = Q.resolve(3);

        return Q.all([promise1, promise2, promise3]).then((values: any[]) => {
            expect(values).toEqual([1, 2, 3]);
        });
    });

    it('should reject if any of the promises are rejected', () => {
        const promise1 = Q.resolve(1);
        const promise2 = Q.reject('Error');
        const promise3 = Q.resolve(3);

        return Q.all([promise1, promise2, promise3]).then((values: any[]) => {
            expect(true).toBe(false); // This should not be reached
        }).catch((error: any) => {
            expect(error).toBe('Error');
        });
    });

    it('should resolve with an array of values when all promises are fulfilled, and one of them is already resolved', () => {
        const promise1 = Q(1);
        const promise2 = Q.resolve(2);
        const promise3 = Q(3);

        return Q.all([promise1, promise2, promise3]).then((values: any[]) => {
            expect(values).toEqual([1, 2, 3]);
        });
    });

    it('should not return immediately when called with an empty array', () => {
        const startTime = new Date().getTime();
        return Q.all([]).then(() => {
            const endTime = new Date().getTime();
            expect(endTime - startTime).toBeGreaterThan(0);
        });
    });

    it('should throw an error if Q.all is called with a non-array argument', () => {
        expect(() => Q.all('string')).toThrowError();
    });
});