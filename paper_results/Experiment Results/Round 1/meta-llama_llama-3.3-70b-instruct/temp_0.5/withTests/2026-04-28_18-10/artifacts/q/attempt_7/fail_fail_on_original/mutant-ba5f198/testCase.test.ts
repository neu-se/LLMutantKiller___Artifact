import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should handle nextTick correctly", () => {
        let called = false;
        Q.nextTick(() => {
            called = true;
        });
        expect(called).toBe(false);
        // Force the next tick to happen
        Q.nextTick(() => {});
        expect(called).toBe(true);
    });
});