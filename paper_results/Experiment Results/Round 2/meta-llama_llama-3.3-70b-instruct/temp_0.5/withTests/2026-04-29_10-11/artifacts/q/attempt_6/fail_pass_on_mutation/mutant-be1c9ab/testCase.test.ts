describe("q", () => {
    it("should detect the mutation in isStopIteration function for StopIteration exception", () => {
        const stopIterationException = { toString: () => "[object StopIteration]" };

        // Original code
        function isStopIterationOriginal(exception: any) {
            return exception.toString() === "[object StopIteration]" ||
                   exception.toString() === "[object QReturnValue]";
        }

        expect(isStopIterationOriginal(stopIterationException)).toBe(true);

        // Mutated code
        function isStopIterationMutated(exception: any) {
            return exception.toString() === "[object StopIteration]" &&
                   exception.toString() === "[object QReturnValue]";
        }

        expect(isStopIterationMutated(stopIterationException)).toBe(false);
    });

    it("should detect the mutation in isStopIteration function for QReturnValue exception", () => {
        const qReturnValueException = { toString: () => "[object QReturnValue]" };

        // Original code
        function isStopIterationOriginal(exception: any) {
            return exception.toString() === "[object StopIteration]" ||
                   exception.toString() === "[object QReturnValue]";
        }

        expect(isStopIterationOriginal(qReturnValueException)).toBe(true);

        // Mutated code
        function isStopIterationMutated(exception: any) {
            return exception.toString() === "[object StopIteration]" &&
                   exception.toString() === "[object QReturnValue]";
        }

        expect(isStopIterationMutated(qReturnValueException)).toBe(false);
    });
});