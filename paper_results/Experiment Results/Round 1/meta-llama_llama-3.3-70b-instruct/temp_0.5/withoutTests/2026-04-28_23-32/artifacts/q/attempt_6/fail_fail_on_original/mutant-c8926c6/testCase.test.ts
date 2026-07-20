import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should not throw an error when process is defined and has nextTick", () => {
        // Mock the process object to be defined and have nextTick
        const originalProcess = global.process;
        global.process = {
            nextTick: jest.fn(),
            toString: () => "[object process]"
        };

        // Expect the Q function to not throw an error
        expect(() => Q()).not.toThrowError();

        // Restore the original process object
        global.process = originalProcess;
    });
});