describe("Q", () => {
    it("should test the behavior of array_reduce with the mutated code", () => {
        var array = [1, , 3];
        var basis = 0;
        var index = 0;
        while (index < array.length) {
            if (index in array) {
                basis += array[index];
                index++;
            } else {
                index++;
            }
        }
        expect(basis).toBe(4);
    });
});