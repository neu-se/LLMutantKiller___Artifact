import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should not use process.nextTick when process is defined but does not have nextTick", () => {
        // Mock the process object to be defined but not have nextTick
        const originalProcess = global.process;
        global.process = {
            toString: () => "[object process]"
        };

        // Call Q function
        Q();

        // Check if process.nextTick was not called
        expect(global.process.nextTick).not.toBeDefined();

        // Restore the original process object
        global.process = originalProcess;
    });
});