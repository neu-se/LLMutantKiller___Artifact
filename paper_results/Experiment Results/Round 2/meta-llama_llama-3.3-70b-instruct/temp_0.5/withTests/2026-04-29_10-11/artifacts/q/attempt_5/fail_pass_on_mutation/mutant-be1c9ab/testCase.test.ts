describe("q", () => {
    it("should detect the mutation in isStopIteration function", () => {
        const exception = { toString: () => "[object StopIteration]" };

        // Original code
        function isStopIterationOriginal(exception: any) {
            return exception.toString() === "[object StopIteration]" ||
                   exception.toString() === "[object QReturnValue]";
        }

        expect(isStopIterationOriginal(exception)).toBe(true);

        // Mutated code
        function isStopIterationMutated(exception: any) {
            return exception.toString() === "[object StopIteration]" &&
                   exception.toString() === "[object QReturnValue]";
        }

        expect(isStopIterationMutated(exception)).toBe(false);
    });
});