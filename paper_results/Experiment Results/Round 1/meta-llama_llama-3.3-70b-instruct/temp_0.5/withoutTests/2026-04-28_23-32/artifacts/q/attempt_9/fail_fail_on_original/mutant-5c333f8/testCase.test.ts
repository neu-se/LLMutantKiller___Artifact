describe("Q", () => {
    it("should handle stack traces correctly", () => {
        const error = new Error();

        function testFunction() {
            throw error;
        }

        try {
            testFunction();
        } catch (e: any) {
            const originalStack = e.stack;
            expect(originalStack).not.toBeNull();
            const lines = originalStack.split("\n");
            const firstLine = lines[0];
            expect(firstLine).toContain("testFunction");
        }
    });
});