import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should throw an error when given a non-function resolver with no arguments", () => {
        expect(() => q()).toThrowError();
    });
});