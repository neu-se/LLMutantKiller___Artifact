// Since we cannot import the Q module, we will have to assume it is already available in the scope.
describe("Q.get function", () => {
    it("should throw an error when Q.get is not implemented", () => {
        const object = { a: 1 };
        const key = "a";
        expect(() => Q.get(object, key)).toThrowError();
    });
});