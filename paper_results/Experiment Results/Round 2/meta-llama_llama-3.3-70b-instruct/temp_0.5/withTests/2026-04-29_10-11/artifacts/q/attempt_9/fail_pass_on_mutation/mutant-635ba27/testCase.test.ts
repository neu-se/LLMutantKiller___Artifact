describe("indexOf function", () => {
    it("should return the correct index when the value is found in the array in ascending order", () => {
        var arr = [1, 2, 3, 4, 5];
        var value = 3;
        var index = -1;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === value) {
                index = i;
                break;
            }
        }
        expect(index).toBe(2);
    });

    it("should return -1 when the value is not found in the array in ascending order", () => {
        var arr = [1, 2, 3, 4, 5];
        var value = 6;
        var index = -1;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === value) {
                index = i;
                break;
            }
        }
        expect(index).toBe(-1);
    });
});