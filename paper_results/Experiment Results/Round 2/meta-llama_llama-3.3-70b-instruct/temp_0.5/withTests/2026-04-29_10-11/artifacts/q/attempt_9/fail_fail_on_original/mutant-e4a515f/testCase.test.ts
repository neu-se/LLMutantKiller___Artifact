import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should throw an error when given a resolver that is not a function", () => {
        const resolver = {};
        expect(() => q(resolver)).toThrowError();
    });
});