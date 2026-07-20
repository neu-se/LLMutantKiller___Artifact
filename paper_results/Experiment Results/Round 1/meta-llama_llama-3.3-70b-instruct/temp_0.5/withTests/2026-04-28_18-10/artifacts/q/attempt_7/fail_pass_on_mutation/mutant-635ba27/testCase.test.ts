describe("array_indexOf function", () => {
    it("should iterate in ascending order", () => {
        const array = [1, 2, 3, 4, 5];
        let indices = [];
        for (let i = 0; i < array.length; i++) {
            if (array[i] === 3) {
                indices.push(i);
            }
        }
        expect(indices).toEqual([2]);
    });

    it.skip("should not iterate in descending order", () => {
        const array = [1, 2, 3, 4, 5];
        let indices = [];
        for (let i = array.length - 1; i >= 0; i--) {
            if (array[i] === 3) {
                indices.push(i);
            }
        }
        expect(indices).not.toEqual([2]);
    });
});