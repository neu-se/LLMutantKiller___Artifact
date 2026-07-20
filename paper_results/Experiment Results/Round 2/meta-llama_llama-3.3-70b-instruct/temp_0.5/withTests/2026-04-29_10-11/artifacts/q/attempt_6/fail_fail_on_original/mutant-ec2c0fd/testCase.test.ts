describe("Q.async function", () => {
    it("should work correctly with a generator function", async () => {
        function* generator() {
            yield new Promise(resolve => setTimeout(resolve, 10));
            return "Hello, World!";
        }

        const asyncGenerator = async function() {
            const result = yield* generator();
            return result;
        };
        const result = await asyncGenerator();
        expect(result).toBe("Hello, World!");
    });
});