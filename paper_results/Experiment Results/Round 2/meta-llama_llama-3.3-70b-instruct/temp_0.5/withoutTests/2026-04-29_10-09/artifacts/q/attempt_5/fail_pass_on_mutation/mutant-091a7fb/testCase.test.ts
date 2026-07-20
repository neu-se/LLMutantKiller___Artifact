import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
    it("should resolve if at least one promise is resolved", () => {
        const promise1 = Q.reject("error1");
        const promise2 = Q.resolve("success");
        return Q.any([promise1, promise2]).then(
            (value: any) => {
                expect(value).toBe("success");
            },
            (error: any) => {
                throw new Error("Expected resolution");
            }
        );
    }, 10000);
});