import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should test the behavior of the mutated file", async () => {
        // The mutation is in the nextTick function, which uses setImmediate in modern browsers.
        // We can test this by checking if the nextTick function uses setImmediate.
        const nextTick = Q.nextTick;
        const originalSetImmediate = global.setImmediate;
        global.setImmediate = jest.fn();
        nextTick(() => {});
        expect(global.setImmediate).toHaveBeenCalledTimes(1);
        global.setImmediate = originalSetImmediate;
    });
});