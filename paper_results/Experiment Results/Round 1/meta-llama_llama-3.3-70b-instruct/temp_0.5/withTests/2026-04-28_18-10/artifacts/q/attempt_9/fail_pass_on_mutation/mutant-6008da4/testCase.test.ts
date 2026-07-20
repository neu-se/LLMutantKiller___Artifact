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

        // Check if nextTick is called immediately
        if (typeof process === "object" && process && process.nextTick) {
            expect(called).toBe(false);
        } else {
            expect(called).toBe(false);
        }

        // Wait for a short time
        setTimeout(() => {
            expect(called).toBe(true);
            done();
        }, 10);
    });
});