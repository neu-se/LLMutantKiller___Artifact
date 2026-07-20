describe("makeStackTraceLong", () => {
    it("should throw an error when trying to define a property with an empty string as the property name", () => {
        const error = new Error();
        const promise = { stackCounter: 1 };
        const originalDefineProperty = Object.defineProperty;
        Object.defineProperty = jest.fn((obj, prop, descriptor) => {
            if (prop === "") {
                throw new Error("Invalid property name");
            }
            return originalDefineProperty(obj, prop, descriptor);
        });
        expect(() => makeStackTraceLong(error, promise)).toThrowError("Invalid property name");
        Object.defineProperty = originalDefineProperty;
    });
});