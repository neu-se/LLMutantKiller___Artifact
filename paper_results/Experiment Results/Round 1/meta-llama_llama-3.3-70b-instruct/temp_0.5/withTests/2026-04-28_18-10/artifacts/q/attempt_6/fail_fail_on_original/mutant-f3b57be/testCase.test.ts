describe("Q", () => {
    it("should handle array_reduce correctly for non-empty arrays", () => {
        var array = [1, 2, 3];
        var result = Q(array).then(function(arr) {
            if (arguments.length === 1) {
                return arr.reduce(function(acc, current) {
                    return acc + current;
                }, 0);
            } else {
                throw new Error("Invalid number of arguments");
            }
        });
        return result.then(function(sum) {
            expect(sum).toBe(6);
        });
    });
});