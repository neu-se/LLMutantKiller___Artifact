describe("array_reduce", () => {
    it("should handle array_reduce correctly for non-empty arrays", () => {
        var array = [1, 2, 3];
        var result = array.reduce(function(acc: number, current: number) {
            return acc + current;
        }, 0);
        expect(result).toBe(6);
    });

    it("should handle array_reduce correctly for arrays with initial value", () => {
        var array = [];
        var result = array.reduce(function(acc: number, current: number) {
            return acc + current;
        }, 10);
        expect(result).toBe(10);
    });

    it.skip("should throw an error for empty arrays without initial value", () => {
        var array: number[] = [];
        expect(() => {
            if (arguments.length === 1) {
                array.reduce(function(acc: number, current: number) {
                    return acc + current;
                });
            }
        }).toThrowError();
    });
});