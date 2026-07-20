describe("Q", () => {
    it("should detect the mutation in isStopIteration function", () => {
        // Create a new Error object
        const error = new Error();

        // Test the original code
        expect(Q.isStopIteration(error)).toBe(false);
    });
});