describe("Q.async", () => {
    it("should handle ES6 generators correctly", async () => {
        function* myGenerator() {
            yield Promise.resolve(1);
            yield Promise.resolve(2);
            return Promise.resolve(3);
        }

        const Q = {
            async: (generator) => {
                let result;
                for (let next of generator) {
                    result = await next;
                }
                return result;
            }
        };

        const asyncFunction = Q.async(myGenerator);
        const result = await asyncFunction();
        expect(result).toBe(3);
    });
});