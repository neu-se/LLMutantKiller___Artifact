describe("array_reduce function in q.js", () => {
    it("should correctly reduce an array with multiple iterations", () => {
        const array = [1, 2, 3, 4, 5];
        const initial = 0;
        const callback = (accumulator: number, current: number) => accumulator + current;
        let count = 0;
        const result = array.reduce((acc, current) => {
            count++;
            return acc + current;
        }, initial);
        expect(result).toBe(15);
        expect(count).toBe(5);
    });
});