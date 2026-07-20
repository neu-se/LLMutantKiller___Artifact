import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should throw an error when process is not defined", () => {
        // Mock the process object to be undefined
        const originalProcess = global.process;
        delete global.process;

        // Expect the Q function to throw an error
        expect(() => Q()).toThrowError("This environment was not anticipated by Q. Please file a bug.");

        // Restore the original process object
        global.process = originalProcess;
    });
});