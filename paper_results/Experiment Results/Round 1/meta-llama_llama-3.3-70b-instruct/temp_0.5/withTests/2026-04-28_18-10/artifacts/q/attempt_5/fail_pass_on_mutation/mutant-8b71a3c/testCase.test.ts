import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should handle valueOf correctly for pending promises", () => {
        const deferred = q.defer();
        const promise = deferred.promise;
        const inspected = promise.inspect();
        if (inspected.state === "pending") {
            expect(promise.valueOf()).toBe(promise);
        } else {
            expect(false).toBe(true);
        }
    });
});