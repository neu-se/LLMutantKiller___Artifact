import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
    it("should correctly handle promise rejection with long stack traces", () => {
        const promise = Q.reject(new Error("Test error"));
        return promise.catch((error) => {
            expect(error.stack).toContain("Test error");
        });
    });
});