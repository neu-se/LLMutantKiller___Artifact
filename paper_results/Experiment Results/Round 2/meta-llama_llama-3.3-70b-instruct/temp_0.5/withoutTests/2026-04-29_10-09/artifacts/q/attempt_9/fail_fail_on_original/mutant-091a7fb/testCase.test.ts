import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
    it("should reject with the correct error message when all promises are rejected", () => {
        const promise1 = Q.reject("error1");
        const promise2 = Q.reject("error2");
        return Q.any([promise1, promise2]).then(
            () => {
                throw new Error("Expected rejection");
            },
            (error: any) => {
                expect(error.message).toContain("Last error message: error2");
            }
        );
    }, 10000);
});