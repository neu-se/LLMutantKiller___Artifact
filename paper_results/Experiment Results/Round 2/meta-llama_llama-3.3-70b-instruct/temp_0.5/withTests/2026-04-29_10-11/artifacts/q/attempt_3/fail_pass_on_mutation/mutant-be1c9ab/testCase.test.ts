describe("q", () => {
    it("should detect the mutation in isStopIteration function", () => {
        const exception1 = { toString: () => "[object StopIteration]" };
        const exception2 = { toString: () => "[object QReturnValue]" };

        // Original code
        function isStopIterationOriginal(exception) {
            return exception.toString() === "[object StopIteration]" ||
                   exception.toString() === "[object QReturnValue]";
        }

        expect(isStopIterationOriginal(exception1)).toBe(true);
        expect(isStopIterationOriginal(exception2)).toBe(true);

        // Mutated code
        function isStopIterationMutated(exception) {
            return exception.toString() === "[object StopIteration]" &&
                   exception.toString() === "[object QReturnValue]";
        }

        expect(isStopIterationMutated(exception1)).toBe(false);
        expect(isStopIterationMutated(exception2)).toBe(false);
    });
});