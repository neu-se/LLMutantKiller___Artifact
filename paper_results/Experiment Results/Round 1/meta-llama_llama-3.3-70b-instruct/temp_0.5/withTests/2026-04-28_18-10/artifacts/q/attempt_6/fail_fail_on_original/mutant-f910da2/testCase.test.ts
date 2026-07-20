describe("Q.async", () => {
    it("should correctly handle StopIteration exception", () => {
        function* myGenerator() {
            yield 1;
            yield 2;
            yield 3;
            return 4;
        }

        const asyncGenerator = Q.async(myGenerator);
        const result = asyncGenerator();
        return result.then((value) => {
            expect(value).toBe(4);
        });
    });
});