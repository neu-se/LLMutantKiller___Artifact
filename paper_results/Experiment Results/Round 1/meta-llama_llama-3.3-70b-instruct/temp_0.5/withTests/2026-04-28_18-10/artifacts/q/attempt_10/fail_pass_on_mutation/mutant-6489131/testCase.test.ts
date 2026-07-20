describe("Q", () => {
    it("should test the behavior of array_reduce with the mutated code", () => {
        var array = [1, , 3];
        var basis = 0;
        for (var i = 0; i < array.length; i++) {
            if (!(i in array)) {
                basis += 1;
            }
        }
        expect(basis).toBe(1);
    });
});