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

        // Wait for a short time
        setTimeout(() => {
            // If the mutation is not present, nextTick should not be called immediately
            expect(called).toBe(false);
            done();
        }, 0);
    });
});