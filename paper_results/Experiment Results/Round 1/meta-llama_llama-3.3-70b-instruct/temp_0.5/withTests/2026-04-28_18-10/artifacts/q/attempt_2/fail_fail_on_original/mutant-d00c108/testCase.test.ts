import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.race function', () => {
    it('should resolve with the first fulfilled promise', () => {
        const promise1 = Q((resolve) => setTimeout(() => resolve('promise1'), 100));
        const promise2 = Q((resolve) => setTimeout(() => resolve('promise2'), 50));
        return Q.race([promise1, promise2]).then((value) => {
            expect(value).toBe('promise2');
        });
    });

    it('should reject with the first rejected promise', () => {
        const promise1 = Q((resolve, reject) => setTimeout(() => reject(new Error('promise1')), 100));
        const promise2 = Q((resolve, reject) => setTimeout(() => reject(new Error('promise2')), 50));
        return Q.race([promise1, promise2]).then(() => {
            expect(true).toBe(false);
        }, (error) => {
            expect(error.message).toBe('promise2');
        });
    });
});