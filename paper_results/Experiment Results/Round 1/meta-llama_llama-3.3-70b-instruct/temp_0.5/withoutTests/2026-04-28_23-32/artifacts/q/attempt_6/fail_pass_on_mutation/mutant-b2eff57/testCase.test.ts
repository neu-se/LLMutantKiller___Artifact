import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
    it("should reject with a meaningful error message when all promises are rejected", async () => {
        const promise1 = q.reject(new Error("Error 1"));
        const promise2 = q.reject(new Error("Error 2"));
        const promise3 = q.reject(new Error("Error 3"));

        const error = await q.any([promise1, promise2, promise3]).catch((err) => err);
        expect(error.message).toContain("Error 3");
    });
});