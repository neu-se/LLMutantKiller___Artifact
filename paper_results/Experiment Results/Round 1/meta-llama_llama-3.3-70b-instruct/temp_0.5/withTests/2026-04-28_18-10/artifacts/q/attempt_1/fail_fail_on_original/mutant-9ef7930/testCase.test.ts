import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.race function", () => {
    it("should reject when all promises are rejected", () => {
        const promise1 = Q.reject("error1");
        const promise2 = Q.reject("error2");
        return Q.race([promise1, promise2]).then(
            () => {
                throw new Error("Expected promise to be rejected");
            },
            (error) => {
                expect(error).toBe("error1");
            }
        );
    });
});