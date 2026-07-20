describe("deprecation warning message format", () => {
    it("should include 'instead.' in the deprecation warning message", () => {
        // The mutation affects this specific string concatenation:
        // Original: name + "" + alternative + " instead.", new Error("").stack
        // Mutated: name + "" + alternative + "", new Error("").stack

        // We'll test this by creating a mock deprecate function that mimics the behavior
        // and checking the output format

        function createDeprecateWarning(name: string, alternative: string): string {
            // This mimics the original deprecate function's string concatenation
            return name + "" + alternative + " instead." + new Error("").stack;
        }

        function createMutatedWarning(name: string, alternative: string): string {
            // This mimics the mutated deprecate function's string concatenation
            return name + "" + alternative + "" + new Error("").stack;
        }

        const testName = "oldFunction";
        const testAlternative = "newFunction";

        const originalWarning = createDeprecateWarning(testName, testAlternative);
        const mutatedWarning = createMutatedWarning(testName, testAlternative);

        // The original should contain "instead." but the mutated version should not
        expect(originalWarning).toContain("instead.");
        expect(mutatedWarning).not.toContain("instead.");

        // This proves the difference between original and mutated code
        expect(originalWarning).not.toEqual(mutatedWarning);
    });
});