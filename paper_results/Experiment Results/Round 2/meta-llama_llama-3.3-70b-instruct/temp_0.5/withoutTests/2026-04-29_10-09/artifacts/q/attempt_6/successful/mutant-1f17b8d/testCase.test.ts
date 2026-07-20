import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.all', () => {
    it('should resolve with an array of values when all promises are resolved', (done) => {
        const promise1 = Q.defer();
        const promise2 = Q.defer();
        const promise3 = Q.defer();

        Q.all([promise1.promise, promise2.promise, promise3.promise]).then((values) => {
            expect(values).toEqual([1, 2, 3]);
            done();
        });

        setTimeout(() => {
            promise1.resolve(1);
            promise2.resolve(2);
            promise3.resolve(3);
        }, 10);
    });
});