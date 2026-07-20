describe("array_reduce function in q.js", () => {
    it("should correctly reduce an array with an empty array", () => {
        const array = [];
        const initial = 0;
        const callback = (accumulator: number, current: number) => accumulator + current;
        const result = array.reduce(callback, initial);
        expect(result).toBe(initial);
    });
});