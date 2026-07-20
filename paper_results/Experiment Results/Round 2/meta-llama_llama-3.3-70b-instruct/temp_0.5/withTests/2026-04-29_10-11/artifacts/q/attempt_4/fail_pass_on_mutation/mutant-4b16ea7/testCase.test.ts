import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should test the behavior of the mutated file", async () => {
        // The mutation is in the nextTick function, which uses setImmediate in modern browsers.
        // We can test this by checking if the nextTick function behaves as expected.
        const deferred = Q.defer();
        const promise = deferred.promise;
        let resolved = false;
        promise.then(() => {
            resolved = true;
        });
        Q.nextTick(() => {
            deferred.resolve();
        });
        await new Promise(resolve => setTimeout(resolve, 10));
        expect(resolved).toBe(true);
    });
});