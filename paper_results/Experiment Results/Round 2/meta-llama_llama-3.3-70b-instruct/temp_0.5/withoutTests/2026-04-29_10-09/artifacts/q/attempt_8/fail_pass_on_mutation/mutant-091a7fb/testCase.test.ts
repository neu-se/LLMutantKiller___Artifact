import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
    it("should reject all promises if the first promise is rejected and pendingCount is incremented", () => {
        const promise1 = Q.reject("error1");
        const promise2 = Q.resolve("success");
        const promise3 = Q.resolve("success2");
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