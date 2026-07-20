import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle promise rejection correctly", async () => {
        const promise = Q.reject("Test error");
        await expect(promise).rejects.toThrow("Test error");
    });
});