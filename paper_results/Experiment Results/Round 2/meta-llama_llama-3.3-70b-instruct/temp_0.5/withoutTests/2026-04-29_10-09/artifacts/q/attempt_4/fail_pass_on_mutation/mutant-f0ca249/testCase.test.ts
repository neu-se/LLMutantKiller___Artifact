describe("Q", () => {
    it("should correctly handle array reduce with no initial value", () => {
        const array = [1, 2, 3];
        const callback = (basis: any, value: any) => basis + value;
        const result = array.reduce(callback);
        expect(result).toBe(6);
    });
});