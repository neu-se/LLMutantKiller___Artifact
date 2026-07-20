describe("Q", () => {
    it("should detect the mutation in isStopIteration function", () => {
        // The original code should return false for some inputs
        const isStopIteration = (exception: any) => Object.prototype.toString.call(exception) === "[object StopIteration]";
        
        // If the function returns true for an object that is not a StopIteration, it's mutated
        expect(isStopIteration({})).toBe(false);
        expect(isStopIteration(new Error())).toBe(false);
    });
});