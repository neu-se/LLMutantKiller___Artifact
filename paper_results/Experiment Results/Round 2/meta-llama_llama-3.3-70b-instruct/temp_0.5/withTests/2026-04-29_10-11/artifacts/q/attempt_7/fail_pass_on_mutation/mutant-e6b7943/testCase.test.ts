describe("Q", () => {
    it("should detect the mutation in isStopIteration function", () => {
        // Create a new Error object
        const error = new Error();

        // Test the original code
        const isStopIteration = (exception: any) => 
            Object.prototype.toString.call(exception) === "[object StopIteration]";
        
        expect(isStopIteration(error)).toBe(false);
        expect(isStopIteration(true)).toBe(false);
        expect(isStopIteration({})).toBe(false);
    });
});