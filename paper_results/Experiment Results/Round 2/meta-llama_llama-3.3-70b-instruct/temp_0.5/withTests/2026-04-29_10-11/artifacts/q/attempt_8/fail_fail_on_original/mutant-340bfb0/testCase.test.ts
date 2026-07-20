describe("makeStackTraceLong", () => {
    it("should throw an error when trying to access a property that does not exist", () => {
        const error = new Error();
        expect(() => error.__minimumStackCounter__).toThrowError();
    });
});