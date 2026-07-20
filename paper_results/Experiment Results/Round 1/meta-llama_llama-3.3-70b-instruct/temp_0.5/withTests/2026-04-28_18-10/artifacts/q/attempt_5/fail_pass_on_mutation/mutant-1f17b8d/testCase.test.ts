import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
    it("should resolve with an array of values when all promises are resolved in the correct order", () => {
        const deferred1 = Q.defer();
        const deferred2 = Q.defer();
        const promise1 = deferred1.promise;
        const promise2 = deferred2.promise;

        const promises = [promise1, promise2];

        Q.all(promises).then((values) => {
            expect(values).toEqual([1, 2]);
        });

        deferred2.resolve(2);
        deferred1.resolve(1);
    });
});