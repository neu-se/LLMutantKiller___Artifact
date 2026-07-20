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

    it("should reject the promise when a resolver function is provided and the resolver function calls reject with an error", () => {
        const promise = Q((resolve, reject) => {
            reject(new Error("Test error"));
        });
        return promise.catch((error) => {
            expect(error.message).toBe("Test error");
        });
    });
});