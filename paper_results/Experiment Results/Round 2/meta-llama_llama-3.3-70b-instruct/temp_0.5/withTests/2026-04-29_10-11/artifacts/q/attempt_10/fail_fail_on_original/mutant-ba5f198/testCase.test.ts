import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick", () => {
    it("should use setTimeout if setImmediate is not available", () => {
        const originalSetImmediate = global.setImmediate;
        global.setImmediate = undefined;
        const originalSetTimeout = global.setTimeout;
        global.setTimeout = jest.fn();

        Q.nextTick(() => {});

        expect(global.setTimeout).toHaveBeenCalledTimes(1);

        global.setImmediate = originalSetImmediate;
        global.setTimeout = originalSetTimeout;
    });
});