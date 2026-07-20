describe("Q", () => {
    it("should correctly handle array_reduce with an array and an initial value", () => {
        var array = [1, 2, 3];
        var initial = 10;
        var result = array.reduce((acc, current) => {
            return acc + current;
        }, initial);

        expect(result).toBe(16);
    });

    it("should throw an error when reducing an empty array without an initial value", () => {
        var array = [];
        expect(() => array.reduce((acc, current) => {
            return acc + current;
        })).toThrowError();
    });
});