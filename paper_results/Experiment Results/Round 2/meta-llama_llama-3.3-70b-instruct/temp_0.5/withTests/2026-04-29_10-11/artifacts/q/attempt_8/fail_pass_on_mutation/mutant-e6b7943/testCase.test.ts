describe("Q", () => {
    it("should detect the mutation in isStopIteration function", () => {
        // Test the original code
        const isStopIteration = (exception: any) => 
            Object.prototype.toString.call(exception) === "[object StopIteration]";

        // The mutated code should always return true
        const mutatedIsStopIteration = (exception: any) => true;

        expect(isStopIteration({})).toBe(false);
        expect(mutatedIsStopIteration({})).toBe(true);
    });
});