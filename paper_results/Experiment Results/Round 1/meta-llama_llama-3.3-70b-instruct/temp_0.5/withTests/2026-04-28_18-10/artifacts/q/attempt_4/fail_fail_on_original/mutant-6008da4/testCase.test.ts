import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should detect the mutation in nextTick function", (done) => {
        // Create a deferred object
        const deferred = q.defer();

        // Use nextTick to resolve the deferred object
        let called = false;
        q.nextTick(() => {
            called = true;
            deferred.resolve();
        });

        // If the mutation is present, nextTick should be called immediately
        // So, the promise should be resolved immediately
        if (typeof process === "object" && process && process.nextTick) {
            expect(called).toBe(true);
        } else {
            expect(called).toBe(false);
        }

        // Wait for the promise to resolve
        deferred.promise.then(() => {
            done();
        });
    });
});