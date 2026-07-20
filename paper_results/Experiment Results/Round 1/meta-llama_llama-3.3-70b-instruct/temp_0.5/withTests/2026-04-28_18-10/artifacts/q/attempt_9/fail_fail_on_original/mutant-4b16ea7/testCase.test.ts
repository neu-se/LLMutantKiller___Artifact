import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library functionality", () => {
    it("should use setImmediate when available", () => {
        var originalSetImmediate = global.setImmediate;
        var calledSetImmediate = false;
        var calledTimeout = false;
        global.setImmediate = (fn: () => void) => {
            calledSetImmediate = true;
            fn();
        };
        global.setTimeout = (fn: () => void, timeout: number) => {
            calledTimeout = true;
            fn();
        };
        q.default.nextTick(() => {});
        expect(calledSetImmediate).toBe(true);
        expect(calledTimeout).toBe(false);
        global.setImmediate = originalSetImmediate;
    });
});