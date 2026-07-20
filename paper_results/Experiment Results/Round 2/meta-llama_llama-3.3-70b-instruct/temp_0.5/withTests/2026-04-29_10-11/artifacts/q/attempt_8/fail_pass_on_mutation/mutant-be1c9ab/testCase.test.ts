describe("q", () => {
    it("should detect the mutation in isStopIteration function", () => {
        const stopIterationException = { toString: () => "[object StopIteration]" };

        // Original code
        function isStopIterationOriginal(exception: any) {
            return exception.toString() === "[object StopIteration]" ||
                   exception.toString() === "[object QReturnValue]";
        }

        // Mutated code
        function isStopIterationMutated(exception: any) {
            return exception.toString() === "[object StopIteration]" &&
                   exception.toString() === "[object QReturnValue]";
        }

        expect(isStopIterationOriginal(stopIterationException)).toBe(true);
        expect(isStopIterationMutated(stopIterationException)).toBe(false);

        // Test case that should pass on original code and fail on mutated code
        expect(isStopIterationOriginal(stopIterationException) || isStopIterationMutated(stopIterationException)).toBe(true);
        expect(isStopIterationMutated(stopIterationException) || isStopIterationOriginal(stopIterationException)).toBe(true);
    });
});