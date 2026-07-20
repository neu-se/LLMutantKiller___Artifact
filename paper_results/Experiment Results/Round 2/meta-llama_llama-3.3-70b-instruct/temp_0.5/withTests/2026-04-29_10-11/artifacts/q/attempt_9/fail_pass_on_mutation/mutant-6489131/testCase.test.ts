describe("array_reduce function in q.js", () => {
    it("should correctly reduce an array with a sparse array and initial value", () => {
        const array = [1, , 3, , 5];
        const initial = 0;
        const callback = (accumulator: number, current: number) => accumulator + current;
        const result = array.reduce(callback, initial);
        expect(result).toBe(9);
        expect(array[1]).toBeUndefined();
        expect(array[3]).toBeUndefined();
    });
});