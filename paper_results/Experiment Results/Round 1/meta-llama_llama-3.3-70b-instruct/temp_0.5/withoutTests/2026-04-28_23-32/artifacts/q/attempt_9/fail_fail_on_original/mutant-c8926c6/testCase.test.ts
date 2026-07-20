describe("Q", () => {
    it("should throw an error when process.nextTick is called without checking process", () => {
        // Mock the process object to be undefined
        const originalProcess = global.process;
        global.process = undefined;

        // Expect the Q function to throw an error
        expect(() => {
            // Call the Q function
            const Q = require('../../../../../../../../subject_repositories/q/q').Q;
            Q();
        }).toThrowError("This environment was not anticipated by Q. Please file a bug.");

        // Restore the original process object
        global.process = originalProcess;
    });
});