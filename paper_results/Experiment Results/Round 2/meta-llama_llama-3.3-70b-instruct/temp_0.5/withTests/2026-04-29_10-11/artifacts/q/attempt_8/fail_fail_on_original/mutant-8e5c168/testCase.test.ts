import Q from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q function with promise", () => {
    it("should resolve the promise when a resolver function is provided", () => {
        const promise = Q((resolve, reject) => {
            resolve("Hello, World!");
        });
        return promise.then((value) => {
            expect(value).toBe("Hello, World!");
        });
    });
});