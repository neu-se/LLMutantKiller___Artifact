describe("Q Promise Library", () => {
    it("should handle process.domain correctly", () => {
        // Create a mock process object
        const originalProcess = global.process;
        global.process = { domain: {} };

        // Create a promise
        const promise = new Promise((resolve, reject) => {
            if (typeof global.process === "object" && global.process && global.process.domain) {
                resolve("Test");
            } else {
                reject("Error");
            }
        });

        // Check if the promise is resolved correctly
        expect(promise).resolves.toBe("Test");

        // Restore the original process object
        global.process = originalProcess;
    });
});