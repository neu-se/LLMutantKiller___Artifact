describe("indexOf function", () => {
    it("should return the correct index when the value is found", () => {
        const array = [1, 2, 3, 4, 5];
        let found = false;
        for (let i = 0; i < array.length; i++) {
            if (array[i] === 3) {
                found = true;
                expect(i).toBe(2);
            }
        }
        expect(found).toBe(true);
    });

    it("should return -1 when the value is not found", () => {
        const array = [1, 2, 3, 4, 5];
        let found = false;
        for (let i = 0; i < array.length; i++) {
            if (array[i] === 6) {
                found = true;
            }
        }
        expect(found).toBe(false);
    });
});