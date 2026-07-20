describe("Q Promise Library", () => {
    it("should handle process.domain correctly", () => {
        // Create a mock process object
        const originalProcess = global.process;
        global.process = { domain: null };

        // Create a promise
        const promise = new Promise((resolve, reject) => {
            if (typeof global.process === "object" && global.process && global.process.domain) {
                resolve("Test");
            } else {
                reject("Error");
            }
        });

        // Check if the promise is rejected correctly
        expect(promise).rejects.toBe("Error");

        // Restore the original process object
        global.process = originalProcess;
    });
});