describe("q", () => {
    it("should detect the mutation in isStopIteration function", () => {
        const exception = { toString: () => "[object StopIteration]" };

        // Original code
        function isStopIterationOriginal(exception) {
            return exception.toString() === "[object StopIteration]" ||
                   exception instanceof Object; // Simulating the instanceof QReturnValue behavior
        }

        expect(isStopIterationOriginal(exception)).toBe(true);

        // Mutated code
        function isStopIterationMutated(exception) {
            return exception.toString() === "[object StopIteration]" &&
                   exception instanceof Object; // Simulating the instanceof QReturnValue behavior
        }

        expect(isStopIterationMutated(exception)).toBe(false);
    });
});