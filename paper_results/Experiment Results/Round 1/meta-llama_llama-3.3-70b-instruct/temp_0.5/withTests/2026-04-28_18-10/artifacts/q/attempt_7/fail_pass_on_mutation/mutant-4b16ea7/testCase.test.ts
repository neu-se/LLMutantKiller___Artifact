import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library functionality", () => {
    it("should use setImmediate when available", () => {
        var originalSetImmediate = global.setImmediate;
        var originalRequestTick = q.default.nextTick.requestTick;
        var called = false;
        q.default.nextTick(function () {
            called = true;
        });
        global.setImmediate = function (fn) {
            fn();
        };
        q.default.nextTick.requestTick = function (fn) {
            expect(fn).toBe(global.setImmediate);
        };
        // This should call the function immediately if setImmediate is available
        q.default.nextTick(function () {
            expect(called).toBe(true);
        });
        global.setImmediate = originalSetImmediate;
        q.default.nextTick.requestTick = originalRequestTick;
    });
});