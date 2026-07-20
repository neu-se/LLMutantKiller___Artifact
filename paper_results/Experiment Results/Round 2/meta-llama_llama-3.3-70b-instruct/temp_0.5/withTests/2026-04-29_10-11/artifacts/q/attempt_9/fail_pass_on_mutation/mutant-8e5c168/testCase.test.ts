import Q from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q function with promise", () => {
    it.skip("should resolve the promise when a resolver function is provided and the resolver function calls resolve with a string", () => {
        const promise = Q((resolve, reject) => {
            resolve("Hello, World!");
        });
        return promise.then((value) => {
            expect(value).toBe("Hello, World!");
        });
    });

    it("should resolve the promise when a resolver function is provided and the resolver function calls reject with a string", () => {
        const promise = Q((resolve, reject) => {
            reject("Hello, World!");
        });
        return promise.catch((error) => {
            expect(error).toBe("Hello, World!");
        });
    });
});