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
        const result = asyncFunction();
        await expect(result).rejects.toThrowError("Test error");
        const thenResult = result.then(() => {}, (error: any) => {
            expect(error.constructor.name).toBe("Error");
            throw error;
        });
        await expect(thenResult).rejects.toThrowError("Test error");
    });
});