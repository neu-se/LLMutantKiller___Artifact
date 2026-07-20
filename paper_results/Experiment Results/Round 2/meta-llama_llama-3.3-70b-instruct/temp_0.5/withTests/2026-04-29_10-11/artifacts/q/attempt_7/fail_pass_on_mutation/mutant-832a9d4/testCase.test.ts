import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should handle nextTick correctly", (done) => {
        const deferred = q.defer();
        let nextTickCalled = false;
        q.nextTick(() => {
            nextTickCalled = true;
            deferred.resolve();
        });
        setTimeout(() => {
            expect(nextTickCalled).toBe(true);
            done();
        }, 0);
    });
});