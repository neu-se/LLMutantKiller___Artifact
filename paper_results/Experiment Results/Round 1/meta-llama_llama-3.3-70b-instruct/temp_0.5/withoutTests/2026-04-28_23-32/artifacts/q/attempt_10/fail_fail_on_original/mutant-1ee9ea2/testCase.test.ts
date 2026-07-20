describe("Q.async function", () => {
    it("should handle ES6 generators correctly", async () => {
        function* generator() {
            yield Promise.resolve(1);
            yield Promise.resolve(2);
        }

        const asyncGenerator = async function () {
            const generator = generator();
            let result;
            try {
                result = generator.next();
            } catch (exception) {
                throw exception;
            }
            if (result.done) {
                return result.value;
            } else {
                await result.value;
                return asyncGenerator();
            }
        };
        const result = await asyncGenerator();
        expect(result).toBeUndefined();
    });
});