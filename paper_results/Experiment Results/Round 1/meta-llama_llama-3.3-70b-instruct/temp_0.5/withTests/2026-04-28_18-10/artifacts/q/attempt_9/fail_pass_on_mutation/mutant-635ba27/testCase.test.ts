describe("indexOf function", () => {
    it("should return the correct index when the value is found", () => {
        const array = [1, 2, 3, 4, 5];
        const index = array.indexOf(3);
        expect(index).toBe(2);
    });

    it("should iterate in ascending order", () => {
        const array = [1, 2, 3, 4, 5];
        let indices = [];
        for (let i = 0; i < array.length; i++) {
            if (array[i] === 3) {
                indices.push(i);
            }
        }
        expect(indices[0]).toBe(2);
    });
});