describe("Q", () => {
    it("should correctly handle reduce with an initial value", () => {
        var array = [1, 2, 3];
        var initial = 10;
        var result = array.reduce(function (acc, current) {
            return acc + current;
        }, initial);

        expect(result).toBe(16);
    });

    it("should correctly handle reduce without an initial value", () => {
        var array = [1, 2, 3];
        var result = array.reduce(function (acc, current) {
            return acc + current;
        });

        expect(result).toBe(6);
    });

    it("should throw an error when reducing an empty array without an initial value", () => {
        var array = [];
        expect(() => array.reduce(function (acc, current) {
            return acc + current;
        })).toThrowError();
    });
});