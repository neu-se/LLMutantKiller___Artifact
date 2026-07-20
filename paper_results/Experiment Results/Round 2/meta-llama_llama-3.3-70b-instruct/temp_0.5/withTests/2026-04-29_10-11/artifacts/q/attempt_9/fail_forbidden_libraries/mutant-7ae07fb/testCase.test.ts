describe("Q promise library", () => {
    it("should throw an error when resolver is not a function", () => {
        const Q = require('q');
        expect(() => Q.promise()).toThrowError("resolver must be a function.");
    });
});