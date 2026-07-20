import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.then behavior", () => {
    it("should handle multiple then calls on the same promise correctly", async () => {
        const deferred = Q.defer();
        let firstCallCount = 0;
        let secondCallCount = 0;

        const promise = deferred.promise.then(() => {
            firstCallCount++;
            return "first";
        });

        promise.then(() => {
            secondCallCount++;
            return "second";
        });

        deferred.resolve(42);

        await promise;
        expect(firstCallCount).toBe(1);
        expect(secondCallCount).toBe(1);
    });
});