describe("Q.async", () => {
    it("should handle ES6 generators correctly", async () => {
        function* myGenerator() {
            yield Promise.resolve(1);
            yield Promise.resolve(2);
            return Promise.resolve(3);
        }

        const asyncFunction = (myGenerator as any).async;
        const result = await asyncFunction();
        expect(result).toBe(3);
    });
});