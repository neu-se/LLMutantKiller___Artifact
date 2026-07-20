describe("indexOf function", () => {
    it("should return the correct index when the value is found", () => {
        const array = [1, 2, 3, 4, 5];
        let foundIndex = -1;
        for (let i = 0; i < array.length; i++) {
            if (array[i] === 3) {
                foundIndex = i;
                break;
            }
        }
        expect(foundIndex).toBe(2);
    });

    it("should return -1 when the value is not found", () => {
        const array = [1, 2, 3, 4, 5];
        let foundIndex = -1;
        for (let i = 0; i < array.length; i++) {
            if (array[i] === 6) {
                foundIndex = i;
                break;
            }
        }
        expect(foundIndex).toBe(-1);
    });
});