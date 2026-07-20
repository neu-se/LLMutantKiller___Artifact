describe("Q.async function", () => {
    it("should handle ES6 generators correctly", async () => {
        function* generator() {
            yield Promise.resolve(1);
            yield Promise.resolve(2);
        }

        const asyncGenerator = (function(makeGenerator) {
            return function () {
                const generator = makeGenerator();
                let result;
                try {
                    result = generator.next();
                } catch (exception) {
                    return Promise.reject(exception);
                }
                if (result.done) {
                    return Promise.resolve(result.value);
                } else {
                    return Promise.resolve(result.value).then(() => asyncGenerator());
                }
            };
        })(generator);
        const result = await asyncGenerator();
        expect(result).toBeUndefined();
    });
});