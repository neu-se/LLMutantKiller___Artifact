describe("indexOf function", () => {
    it("should return the correct index when the value is found in an array with duplicate elements", () => {
        const array = [1, 2, 3, 3, 4, 5];
        const index = array.indexOf(3);
        expect(index).toBe(2);
    });
});