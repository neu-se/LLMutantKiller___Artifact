import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should use process.nextTick when process is defined and has nextTick", () => {
        // Mock the process object to be defined and have nextTick
        const originalProcess = global.process;
        global.process = {
            nextTick: jest.fn(),
            toString: () => "[object process]"
        };

        // Call Q function
        Q();

        // Check if process.nextTick was called
        expect(global.process.nextTick).toHaveBeenCalledTimes(1);

        // Restore the original process object
        global.process = originalProcess;
    });
});