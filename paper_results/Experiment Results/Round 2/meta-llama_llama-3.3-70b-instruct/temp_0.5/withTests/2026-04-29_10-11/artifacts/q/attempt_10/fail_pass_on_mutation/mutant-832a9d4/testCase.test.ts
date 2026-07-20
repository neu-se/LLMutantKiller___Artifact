import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should handle nextTick correctly", (done) => {
        let nextTickCalled = false;
        q.nextTick(() => {
            nextTickCalled = true;
            done();
        });
        expect(nextTickCalled).toBe(false);
        setTimeout(() => {
            expect(nextTickCalled).toBe(true);
        }, 0);
    }, 100);
});