describe("makeStackTraceLong", () => {
    it("should not throw an error when trying to access a property that exists", () => {
        const error = new Error();
        error.__minimumStackCounter__ = 1;
        expect(() => error.__minimumStackCounter__).not.toThrowError();
    });
});