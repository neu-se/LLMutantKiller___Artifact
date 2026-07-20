describe("Q", () => {
    it("should handle process.emit correctly", () => {
        // Check if process.emit is a function and has the correct signature
        expect(typeof process.emit).toBe('function');
        const emitString = process.emit.toString();
        expect(emitString).toContain("(event");
        expect(emitString).toContain("args");
    });
});