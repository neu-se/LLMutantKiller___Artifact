describe("indexOf function", () => {
    it("should return the correct index when the value is found", () => {
        const array = [1, 2, 3, 4, 5];
        const index = array.indexOf(3);
        expect(index).toBe(2);
        const mutatedIndex = array.slice().reverse().indexOf(3);
        expect(mutatedIndex).not.toBe(2);
    });
});