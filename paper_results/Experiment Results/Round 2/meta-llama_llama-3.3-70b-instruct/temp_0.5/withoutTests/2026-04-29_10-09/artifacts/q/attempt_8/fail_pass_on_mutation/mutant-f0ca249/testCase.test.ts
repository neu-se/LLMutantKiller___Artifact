describe("Q", () => {
    it("should correctly handle array reduce with no initial value and an array with a single element that is not a number", () => {
        const array = ["a"];
        const callback = (basis: any, value: any) => basis + value;
        const result = array.reduce(callback);
        expect(typeof result).toBe("string");
    });
});