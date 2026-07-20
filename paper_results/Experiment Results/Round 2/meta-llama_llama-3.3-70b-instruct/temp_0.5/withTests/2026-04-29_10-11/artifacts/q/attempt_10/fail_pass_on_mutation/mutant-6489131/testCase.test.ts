describe("array_reduce function in q.js", () => {
    it("should correctly reduce an array with a sparse array and check for index increment", () => {
        const array = [1, , 3, , 5];
        const initial = 0;
        let index = 0;
        const callback = (accumulator: number, current: number) => {
            index++;
            return accumulator + current;
        };
        const result = array.reduce(callback, initial);
        expect(result).toBe(9);
        expect(index).toBe(3); // In the original code, index should be 3 because the empty slots are skipped
    });
});