describe("Error", () => {
    it("should have a stack property with a specific format", () => {
        const error = new Error("Test error");
        const stack = error.stack;
        const match = stack.match(/at .* \((.*):(\d+):(\d+)\)/);
        expect(match).toBeDefined();
        expect(match[1]).toBeDefined();
        expect(match[2]).toBeDefined();
        expect(match[3]).toBeDefined();
        expect(match[1]).not.toBe("(no stack)");
    });
});