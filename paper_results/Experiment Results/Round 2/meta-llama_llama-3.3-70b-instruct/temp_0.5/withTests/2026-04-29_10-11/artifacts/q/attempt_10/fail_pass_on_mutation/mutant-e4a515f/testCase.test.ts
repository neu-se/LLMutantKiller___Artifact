import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should not throw an error when given a function resolver", () => {
        const resolver = function () {};
        expect(() => q(resolver)).not.toThrowError();
    });
});