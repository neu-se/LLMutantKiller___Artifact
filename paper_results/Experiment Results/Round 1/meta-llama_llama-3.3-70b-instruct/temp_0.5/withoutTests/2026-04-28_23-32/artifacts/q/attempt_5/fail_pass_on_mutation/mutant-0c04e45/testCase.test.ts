import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle promise rejection correctly", async () => {
        const promise = Q.async(function* () {
            yield Promise.resolve(1);
            throw new Error("Test error");
        });
        await expect(promise).rejects.toThrowError("Test error");
    });
});