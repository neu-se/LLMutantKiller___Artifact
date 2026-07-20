describe("Q.async", () => {
    it("should handle ES6 generators correctly", async () => {
        function* myGenerator() {
            yield Promise.resolve(1);
            yield Promise.resolve(2);
            return Promise.resolve(3);
        }

        const asyncFunction = async () => {
            for await (const value of myGenerator()) {
                // do nothing
            }
            return 3;
        };

        const result = await asyncFunction();
        expect(result).toBe(3);
    });
});