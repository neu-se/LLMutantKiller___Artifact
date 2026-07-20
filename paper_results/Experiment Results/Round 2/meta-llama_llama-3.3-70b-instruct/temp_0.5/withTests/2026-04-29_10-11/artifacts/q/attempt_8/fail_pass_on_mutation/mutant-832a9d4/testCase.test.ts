import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should handle nextTick correctly", (done) => {
        let nextTickCalled = false;
        let timeoutCalled = false;
        q.nextTick(() => {
            nextTickCalled = true;
        });
        setTimeout(() => {
            timeoutCalled = true;
            expect(nextTickCalled).toBe(true);
            done();
        }, 0);
        expect(nextTickCalled).toBe(false);
        expect(timeoutCalled).toBe(false);
    });
});