import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should use setImmediate when available", (done) => {
        const originalSetImmediate = global.setImmediate;
        const setImmediateSpy = jest.fn();
        global.setImmediate = setImmediateSpy;

        Q.nextTick(() => {
            // Do something
        });

        global.setTimeout(() => {
            if (typeof global.setImmediate === 'function') {
                expect(setImmediateSpy).toHaveBeenCalledTimes(1);
            } else {
                expect(setImmediateSpy).not.toHaveBeenCalled();
            }
            global.setImmediate = originalSetImmediate;
            done();
        }, 10);
    });
});