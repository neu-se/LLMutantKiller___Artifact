describe("Q", () => {
    it("should throw an error when process is not an object", () => {
        // Mock the process object to be a string
        const originalProcess = global.process;
        global.process = "string";

        // Expect the Q function to throw an error
        expect(() => {
            // Call the Q function
            const Q = require('../../../../../../../../subject_repositories/q/q').Q;
            Q();
        }).toThrowError();

        // Restore the original process object
        global.process = originalProcess;
    });
});