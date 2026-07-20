import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick", () => {
    it("should use setImmediate if available", () => {
        const originalSetImmediate = global.setImmediate;
        global.setImmediate = jest.fn();

        Q.nextTick(() => {});

        expect(global.setImmediate).toHaveBeenCalledTimes(1);

        global.setImmediate = originalSetImmediate;
    });
});