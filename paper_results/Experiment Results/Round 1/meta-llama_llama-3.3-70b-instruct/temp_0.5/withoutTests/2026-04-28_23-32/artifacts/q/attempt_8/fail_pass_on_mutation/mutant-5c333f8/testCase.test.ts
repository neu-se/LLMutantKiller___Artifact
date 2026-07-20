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
            expect(lines.length).toBeGreaterThan(2);
        }
    });
});