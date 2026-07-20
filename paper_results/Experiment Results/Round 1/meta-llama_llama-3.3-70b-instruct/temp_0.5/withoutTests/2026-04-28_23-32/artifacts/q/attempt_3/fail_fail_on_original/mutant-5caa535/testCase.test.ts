describe("Q", () => {
    it("should handle array indexing correctly", () => {
        const array = [1, 2, 3];
        const promise = Q(array);
        return promise.then((array: any[]) => {
            expect(() => array_indexOf(array, 4)).not.toThrow();
        });
    });
});