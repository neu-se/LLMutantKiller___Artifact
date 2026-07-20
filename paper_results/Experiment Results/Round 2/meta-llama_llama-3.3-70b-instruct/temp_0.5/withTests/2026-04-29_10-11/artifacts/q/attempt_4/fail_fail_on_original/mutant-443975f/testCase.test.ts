const Q = require("../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nextTick behavior", () => {
    it("should use setImmediate when available", (done) => {
        const originalSetImmediate = global.setImmediate;
        global.setImmediate = jest.fn();
        Q.nextTick(() => {
            expect(global.setImmediate).toHaveBeenCalledTimes(1);
            global.setImmediate = originalSetImmediate;
            done();
        });
    });
});