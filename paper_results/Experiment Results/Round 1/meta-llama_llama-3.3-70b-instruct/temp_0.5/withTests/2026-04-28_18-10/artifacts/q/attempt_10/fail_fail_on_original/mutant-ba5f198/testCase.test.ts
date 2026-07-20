import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should handle setImmediate correctly", () => {
        let setImmediateCalled = false;
        let setTimeoutCalled = false;
        (global as any).setImmediate = () => {
            setImmediateCalled = true;
        };
        (global as any).setTimeout = () => {
            setTimeoutCalled = true;
        };
        Q.nextTick(() => {});
        expect(setImmediateCalled).toBe(true);
        expect(setTimeoutCalled).toBe(false);
    });
});