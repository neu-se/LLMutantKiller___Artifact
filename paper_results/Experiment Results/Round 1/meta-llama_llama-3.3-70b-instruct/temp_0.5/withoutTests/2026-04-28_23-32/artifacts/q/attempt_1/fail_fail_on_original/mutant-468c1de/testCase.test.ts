import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
    it("should correctly handle error stack traces", async () => {
        const error = new Error("Test error");
        const promise = Q.reject(error);
        await expect(promise).rejects.toThrowError("Test error");
        expect(error.stack).toContain("makeStackTraceLong");
    });
});