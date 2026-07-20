import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should handle setImmediate correctly", () => {
        let setImmediateCalled = false;
        let nextTickCalled = false;
        (global as any).setImmediate = () => {
            setImmediateCalled = true;
        };
        Q.nextTick(() => {
            nextTickCalled = true;
        });
        expect(setImmediateCalled).toBe(false);
        expect(nextTickCalled).toBe(false);
    });
});