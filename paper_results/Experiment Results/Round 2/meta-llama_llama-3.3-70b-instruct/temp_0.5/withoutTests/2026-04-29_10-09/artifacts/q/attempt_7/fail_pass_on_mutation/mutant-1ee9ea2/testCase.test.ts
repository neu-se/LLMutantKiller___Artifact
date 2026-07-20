describe("Q.async", () => {
    it("should handle ES6 generators correctly", async () => {
        function* myGenerator() {
            yield Promise.resolve(1);
            yield Promise.resolve(2);
            return Promise.resolve(3);
        }

        const asyncFunction = (function* () {
            yield Promise.resolve(1);
            yield Promise.resolve(2);
            return Promise.resolve(3);
        })();
        const result = asyncFunction.next();
        expect(result.value).toEqual(Promise.resolve(1));
    });
});