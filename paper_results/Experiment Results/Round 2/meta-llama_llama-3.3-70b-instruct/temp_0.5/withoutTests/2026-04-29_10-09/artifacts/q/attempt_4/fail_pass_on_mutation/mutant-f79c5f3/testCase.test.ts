import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.all', () => {
    it('should resolve with an array of values when all promises are fulfilled', () => {
        const promise1 = q.resolve(1);
        const promise2 = q.resolve(2);
        const promise3 = q.resolve(3);

        return q.all([promise1, promise2, promise3]).then((values: any[]) => {
            expect(values).toEqual([1, 2, 3]);
        });
    });

    it('should reject with the reason of the first rejected promise', () => {
        const promise1 = q.resolve(1);
        const promise2 = q.reject('Error');
        const promise3 = q.resolve(3);

        return q.all([promise1, promise2, promise3]).then(() => {
            expect(true).toBe(false); // This should not be reached
        }).catch((reason: any) => {
            expect(reason).toBe('Error');
        });
    });

    it.skip('should test the mutation', () => {
        const promise1 = q.resolve(1);
        const promise2 = q.resolve(2);
        const promise3 = q.reject('Error');

        return q.all([promise1, promise2, promise3]).then((values: any[]) => {
            expect(values).toEqual([1, 2]); // This should fail on the mutated code
        }).catch((reason: any) => {
            expect(true).toBe(false); // This should not be reached on the mutated code
        });
    });
});