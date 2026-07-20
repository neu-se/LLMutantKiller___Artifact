import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library functionality", () => {
    it("should use setImmediate when available", () => {
        var originalSetImmediate = global.setImmediate;
        var called = false;
        q.default.nextTick(function () {
            called = true;
        });
        global.setImmediate = function (fn) {
            fn();
        };
        expect(called).toBe(false);
        // This should call the function immediately if setImmediate is available
        q.default.nextTick(function () {
            expect(called).toBe(true);
        });
        global.setImmediate = originalSetImmediate;
    });
});