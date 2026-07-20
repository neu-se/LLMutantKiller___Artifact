describe("Q", () => {
    it("should correctly handle reduce with an empty array and no initial value", () => {
        var array = [];
        var result = array.reduce(function (acc, current) {
            return acc + current;
        });

        expect(result).toBeUndefined();
    });
});