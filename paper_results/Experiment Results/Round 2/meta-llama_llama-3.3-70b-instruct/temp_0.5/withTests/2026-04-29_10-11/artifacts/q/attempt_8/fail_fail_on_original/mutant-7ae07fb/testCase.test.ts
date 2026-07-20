describe("Q promise library", () => {
    it("should not throw an error when resolver is a function", () => {
        const Q = require('../../../../q');
        expect(() => Q.promise(() => {})).not.toThrowError();
    });
});