import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should check if the resolver is a function", () => {
        const resolver = {};
        expect(() => q(resolver)).toThrowError();
    });
});