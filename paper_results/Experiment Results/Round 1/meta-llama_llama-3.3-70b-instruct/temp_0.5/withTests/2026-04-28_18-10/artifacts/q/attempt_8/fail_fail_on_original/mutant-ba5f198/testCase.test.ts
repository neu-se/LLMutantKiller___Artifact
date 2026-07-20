import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should handle setImmediate correctly", () => {
        let setImmediateCalled = false;
        (global as any).setImmediate = () => {
            setImmediateCalled = true;
        };
        Q.nextTick(() => {});
        expect(setImmediateCalled).toBe(true);
    });
});