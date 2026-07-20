import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library functionality", () => {
    it("should resolve promises correctly with setImmediate", () => {
        var called = false;
        q.default.nextTick(function () {
            called = true;
        });
        expect(called).toBe(false);
        // This should call the function in the next tick
        return q.default.nextTick(function () {
            expect(called).toBe(true);
        });
    });
});