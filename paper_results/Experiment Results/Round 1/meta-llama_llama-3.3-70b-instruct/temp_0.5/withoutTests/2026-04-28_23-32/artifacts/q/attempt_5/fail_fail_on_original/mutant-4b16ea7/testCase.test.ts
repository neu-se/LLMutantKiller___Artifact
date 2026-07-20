import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should use setImmediate when available", () => {
        const originalSetTimeout = global.setTimeout;
        const setTimeoutSpy = jest.fn();
        global.setTimeout = setTimeoutSpy;

        Q.nextTick(() => {
            // Do something
        });

        expect(setTimeoutSpy).toHaveBeenCalledTimes(1);

        global.setTimeout = originalSetTimeout;
    });
});