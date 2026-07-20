const Q = require("../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nextTick behavior", () => {
    it("should use setImmediate when available", () => {
        const originalSetImmediate = global.setImmediate;
        global.setImmediate = jest.fn();
        const nextTickSpy = jest.spyOn(Q, 'nextTick');
        Q.nextTick(() => {});
        expect(nextTickSpy).toHaveBeenCalledTimes(1);
        expect(global.setImmediate).toHaveBeenCalledTimes(1);
        global.setImmediate = originalSetImmediate;
    });
});