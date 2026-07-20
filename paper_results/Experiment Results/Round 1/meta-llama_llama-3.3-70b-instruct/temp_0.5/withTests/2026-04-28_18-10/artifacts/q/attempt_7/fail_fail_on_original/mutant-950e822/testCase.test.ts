describe("Promise.prototype.toString", () => {
    it("should throw an error when toString is not implemented and then called on a promise", () => {
        const promise = Promise.resolve(10);
        const originalToString = Promise.prototype.toString;
        Promise.prototype.toString = function () { };
        expect(() => promise.toString()).toThrowError();
        Promise.prototype.toString = originalToString;
    });
});