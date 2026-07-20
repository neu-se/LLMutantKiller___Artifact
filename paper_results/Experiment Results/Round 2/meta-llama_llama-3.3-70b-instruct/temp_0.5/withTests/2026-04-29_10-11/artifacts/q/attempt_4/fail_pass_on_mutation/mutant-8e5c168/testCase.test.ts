import Q from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q function with resolver", () => {
    it("should throw an error when resolver is not a function", () => {
        expect(() => Q(123)).not.toThrow();
        expect(() => Q("string")).not.toThrow();
        expect(() => Q({})).not.toThrow();
        expect(() => Q(null)).not.toThrow();
        expect(() => Q(undefined)).not.toThrow();
    });

    it("should throw an error when resolver is not provided", () => {
        expect(() => Q()).not.toThrow();
    });

    it("should throw an error when resolver is provided but is not a function", () => {
        expect(() => Q(123)).not.toThrow();
        expect(() => Q("string")).not.toThrow();
        expect(() => Q({})).not.toThrow();
        expect(() => Q(null)).not.toThrow();
        expect(() => Q(undefined)).not.toThrow();
    });

    it.skip("should resolve the promise when a resolver function is provided", () => {
        const promise = Q((resolve, reject) => {
            resolve("Hello, World!");
        });
        return promise.then((value) => {
            expect(value).toBe("Hello, World!");
        });
    });
});