describe("Promise", () => {
    it("should throw an error when inspect is not a function", () => {
        const Q = require("../../../../../../../../../../../subject_repositories/q/q");
        expect(() => Q.Promise({}, () => {}, undefined)).toThrowError();
    });
});