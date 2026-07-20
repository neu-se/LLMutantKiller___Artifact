import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should return a promise when given a resolver that is a function", () => {
        const resolver = function () {};
        const promise = q(resolver);
        expect(promise).toBeInstanceOf(Promise);
    });
    it("should throw an error when given a resolver that is not a function", () => {
        const resolver = {};
        expect(() => q(resolver)).toThrowError();
    });
    it("should return a promise when given a resolver that is a function again", () => {
        const resolver = function () {};
        const promise = q(resolver);
        expect(promise).toBeInstanceOf(Promise);
    });
    it("should throw an error when given a resolver that is not a function again", () => {
        const resolver = {};
        expect(() => q(resolver)).toThrowError();
    });
    it("should return a promise when given a resolver that is a function again", () => {
        const resolver = function () {};
        const promise = q(resolver);
        expect(promise).toBeInstanceOf(Promise);
    });
});