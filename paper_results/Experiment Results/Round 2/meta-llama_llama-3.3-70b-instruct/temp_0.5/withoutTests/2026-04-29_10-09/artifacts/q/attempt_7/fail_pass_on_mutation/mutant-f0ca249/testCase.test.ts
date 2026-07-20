describe("Q", () => {
    it("should correctly handle array reduce with no initial value and an empty array", () => {
        const array = [];
        const callback = (basis: any, value: any) => basis + value;
        expect(() => array.reduce(callback)).toThrow(TypeError);
    });
});