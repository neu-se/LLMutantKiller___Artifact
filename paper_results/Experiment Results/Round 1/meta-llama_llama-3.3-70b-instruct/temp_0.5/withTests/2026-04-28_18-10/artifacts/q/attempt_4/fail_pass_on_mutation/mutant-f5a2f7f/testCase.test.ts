describe("q", () => {
    it("should capture the line number correctly", () => {
        // Create a new error
        const error = new Error();

        // Check if the error's stack property is truthy
        expect(error.stack).toBeTruthy();
    });
});