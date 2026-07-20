import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.then behavior", () => {
    it("should handle multiple then calls with early return", async () => {
        const deferred = Q.defer();
        let firstThenCount = 0;
        let secondThenCount = 0;

        const promise = deferred.promise.then(() => {
            firstThenCount++;
            return Q.resolve("intermediate");
        }).then(() => {
            secondThenCount++;
            return "final";
        });

        deferred.resolve(42);
        await promise;

        expect(firstThenCount).toBe(1);
        expect(secondThenCount).toBe(1);
    });
});