describe("Q", () => {
    it("should correctly handle reduce with an array that has a sparse index", () => {
        var array = [1, , 3];
        var initial = 10;
        var result = array.reduce(function (acc, current) {
            if (current === undefined) {
                throw new Error("Sparse array index encountered");
            }
            return acc + current;
        }, initial);

        expect(() => result).toThrowError("Sparse array index encountered");
    });
});