import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle async generator errors correctly", async () => {
        const asyncFunction = Q.async(function* () {
            try {
                yield Promise.resolve(1);
                throw new Error("Test error");
            } catch (error) {
                throw error;
            }
        });
        await expect(asyncFunction()).rejects.toThrowError("Test error");
    });
});