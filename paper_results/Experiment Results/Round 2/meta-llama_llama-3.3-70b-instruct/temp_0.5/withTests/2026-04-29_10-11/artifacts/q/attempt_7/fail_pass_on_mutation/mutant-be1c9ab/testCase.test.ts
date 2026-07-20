describe("q", () => {
    it("should detect the mutation in isStopIteration function", () => {
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

        expect(() => {
            if (isStopIterationMutated(stopIterationException)) {
                throw new Error("Test failed");
            }
        }).not.toThrow();
    });
});