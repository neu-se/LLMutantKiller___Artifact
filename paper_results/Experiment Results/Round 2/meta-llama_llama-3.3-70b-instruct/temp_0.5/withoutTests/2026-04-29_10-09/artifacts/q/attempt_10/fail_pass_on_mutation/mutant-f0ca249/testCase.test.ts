describe("Q", () => {
    it("should correctly handle array reduce with no initial value and an array with a large number of elements", () => {
        const array = new Array(1000000).fill(1);
        const callback = (basis: any, value: any) => basis + value;
        const result = array.reduce(callback);
        expect(result).toBe(1000000);
    });
});