import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle async generator errors correctly", async () => {
        const asyncFunction = Q.async(function* () {
            yield Promise.resolve(1);
            throw new Error("Test error");
        });
        const result = asyncFunction();
        await expect(result).rejects.toThrowError("Test error");
        const thenResult = result.then(() => {}, (error: any) => {
            expect(error.stack).toContain("asyncFunction");
            throw error;
        });
        await expect(thenResult).rejects.toThrowError("Test error");
    });
});