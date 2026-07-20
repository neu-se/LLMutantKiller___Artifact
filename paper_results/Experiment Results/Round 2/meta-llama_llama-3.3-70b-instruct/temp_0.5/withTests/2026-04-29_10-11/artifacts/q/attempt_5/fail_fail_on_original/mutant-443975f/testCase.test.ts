const Q = require("../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nextTick behavior", () => {
    it("should execute a task in the next event loop iteration", (done) => {
        let executed = false;
        Q.nextTick(() => {
            executed = true;
        });
        expect(executed).toBe(false);
        // Force the event loop to proceed to the next iteration
        setTimeout(() => {
            expect(executed).toBe(true);
            done();
        }, 0);
    });

    it("should use setTimeout when setImmediate is not available", (done) => {
        const originalSetTimeout = global.setTimeout;
        global.setTimeout = jest.fn();
        Q.nextTick(() => {
            expect(global.setTimeout).toHaveBeenCalledTimes(1);
            global.setTimeout = originalSetTimeout;
            done();
        });
    });
});