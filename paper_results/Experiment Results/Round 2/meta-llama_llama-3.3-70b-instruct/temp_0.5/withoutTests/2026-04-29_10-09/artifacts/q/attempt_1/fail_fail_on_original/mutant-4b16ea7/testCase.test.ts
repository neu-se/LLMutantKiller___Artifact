import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should call the nextTick function with the flush function when setImmediate is available", () => {
        // Mock the setImmediate function to test its availability
        const originalSetImmediate = global.setImmediate;
        global.setImmediate = jest.fn();

        // Create a new instance of Q
        const q = Q();

        // Check if the nextTick function is called with the flush function
        expect(q.nextTick).toHaveBeenCalledTimes(1);
        expect(q.nextTick).toHaveBeenCalledWith(expect.any(Function));

        // Restore the original setImmediate function
        global.setImmediate = originalSetImmediate;
    });
});