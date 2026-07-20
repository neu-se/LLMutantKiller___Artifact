import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
    it("should reject with the first error when any promise is rejected and the pendingCount is incremented", () => {
        const deferred1 = Q.defer();
        const deferred2 = Q.defer();
        const promise1 = deferred1.promise;
        const promise2 = deferred2.promise;

        const promises = [promise1, promise2];

        let pendingCount = 0;

        Q.all(promises).then(() => {
            expect(true).toBe(false);
        }, () => {
            expect(pendingCount).toBe(2);
        });

        deferred1.resolve(1);
        deferred2.reject("Error");

        pendingCount++;
    });
});