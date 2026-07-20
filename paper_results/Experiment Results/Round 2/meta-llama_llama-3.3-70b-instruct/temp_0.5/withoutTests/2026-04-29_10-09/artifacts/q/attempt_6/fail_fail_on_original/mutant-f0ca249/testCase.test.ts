describe("Q", () => {
    it("should correctly handle array reduce with no initial value and an array with a single element", () => {
        const array = [1];
        const callback = (basis: any, value: any) => basis + value;
        const result = array.reduce(callback);
        expect(result).toBeNaN();
    });
});