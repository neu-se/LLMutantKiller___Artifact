import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.then behavior", () => {
    it("should handle promise resolution with early return in then chain", async () => {
        const deferred = Q.defer();
        let executionCount = 0;

        const promise = deferred.promise.then(value => {
            executionCount++;
            if (executionCount > 1) {
                return Q.reject(new Error("Should not execute twice"));
            }
            return value;
        });

        deferred.resolve(42);
        await promise;
        expect(executionCount).toBe(1);
    });
});