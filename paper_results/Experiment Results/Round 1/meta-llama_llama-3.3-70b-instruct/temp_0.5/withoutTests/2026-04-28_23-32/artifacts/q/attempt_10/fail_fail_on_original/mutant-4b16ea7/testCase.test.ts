import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should use setImmediate when available", () => {
        const originalSetImmediate = global.setImmediate;
        const setImmediateSpy = jest.fn();
        global.setImmediate = setImmediateSpy;
        Q.nextTick(() => {});
        expect(setImmediateSpy).toHaveBeenCalledTimes(1);
        global.setImmediate = originalSetImmediate;
    });
});