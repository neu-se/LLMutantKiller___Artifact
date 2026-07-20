import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should throw an error when process is not defined and nextTick is called", () => {
        // Mock the process object to be undefined
        const originalProcess = global.process;
        global.process = undefined;

        // Expect the Q function to throw an error
        expect(() => Q()).toThrowError();

        // Restore the original process object
        global.process = originalProcess;
    });
});