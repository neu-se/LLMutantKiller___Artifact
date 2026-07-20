describe("array_reduce", () => {
    it("should handle array_reduce correctly for non-empty arrays", () => {
        var array = [1, 2, 3];
        var result = array.reduce(function(acc: number, current: number) {
            return acc + current;
        }, 0);
        expect(result).toBe(6);
    });

    it("should throw an error for empty arrays", () => {
        var array: number[] = [];
        expect(() => array.reduce(function(acc: number, current: number) {
            return acc + current;
        })).toThrowError();
    });
});