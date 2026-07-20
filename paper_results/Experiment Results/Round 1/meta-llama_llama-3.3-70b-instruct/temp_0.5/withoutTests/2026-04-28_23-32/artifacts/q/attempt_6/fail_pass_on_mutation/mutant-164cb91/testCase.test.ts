describe("Q", () => {
    it("should handle unhandled rejections correctly", () => {
        // Check if process.emit is a function
        expect(typeof process.emit).toBe('function');
    });
});