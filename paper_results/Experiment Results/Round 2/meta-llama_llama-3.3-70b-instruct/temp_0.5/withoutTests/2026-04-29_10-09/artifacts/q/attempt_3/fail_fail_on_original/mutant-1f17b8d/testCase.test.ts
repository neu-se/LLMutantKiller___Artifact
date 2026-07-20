import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.all', () => {
    it('should resolve with an array of values when all promises are resolved', () => {
        const promise1 = Q.defer().promise;
        const promise2 = Q.defer().promise;
        const promise3 = Q.defer().promise;

        Q.all([promise1, promise2, promise3]).then((values) => {
            expect(values).toEqual([1, 2, 3]);
        });

        promise1.resolve(1);
        promise2.resolve(2);
        promise3.resolve(3);
    });
});