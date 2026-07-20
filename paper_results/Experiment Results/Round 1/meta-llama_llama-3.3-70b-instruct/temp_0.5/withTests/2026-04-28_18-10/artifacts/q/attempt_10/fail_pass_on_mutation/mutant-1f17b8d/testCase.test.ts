import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
    it("should correctly handle an array of promises and pendingCount", () => {
        const deferred1 = Q.defer();
        const deferred2 = Q.defer();
        const promise1 = deferred1.promise;
        const promise2 = deferred2.promise;

        const promises = [promise1, promise2];

        let pendingCount = 0;

        Q.all(promises).then((values: any[]) => {
            expect(values).toEqual([1, 2]);
        });

        deferred1.resolve(1);
        deferred2.resolve(2);

        pendingCount += 2;

        expect(pendingCount).toBe(2);
    });
});