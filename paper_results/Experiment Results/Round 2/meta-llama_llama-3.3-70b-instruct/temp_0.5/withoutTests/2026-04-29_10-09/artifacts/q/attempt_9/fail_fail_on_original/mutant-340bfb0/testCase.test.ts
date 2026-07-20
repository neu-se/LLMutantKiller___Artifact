describe("Q promise library", () => {
    it("should throw an error when trying to define a property with an empty string as the property name", () => {
        const error = new Error();
        expect(() => {
            Object.defineProperty(error, "", { value: 1, configurable: true });
        }).toThrowError();
    });
});