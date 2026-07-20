import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.then behavior", () => {
    it("should prevent multiple resolutions of the same promise", async () => {
        const deferred = Q.defer();
        let callCount = 0;

        const promise = deferred.promise.then(() => {
            callCount++;
            return "fulfilled";
        });

        deferred.resolve(42);
        deferred.resolve(43); // Second resolve should be ignored

        await promise;
        expect(callCount).toBe(1);
    });
});