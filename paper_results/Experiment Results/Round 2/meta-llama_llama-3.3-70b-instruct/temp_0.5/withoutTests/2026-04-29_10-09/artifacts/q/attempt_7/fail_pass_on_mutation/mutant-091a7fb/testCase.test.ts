import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
    it("should reject if all promises are rejected and the rejection order is correct", () => {
        const promise1 = Q.reject("error1");
        const promise2 = Q.resolve("success");
        const promise3 = Q.reject("error3");
        return Q.any([promise1, promise2, promise3]).then(
            (value: any) => {
                expect(value).toBe("success");
            },
            (error: any) => {
                throw new Error("Expected resolution");
            }
        );
    }, 10000);
});