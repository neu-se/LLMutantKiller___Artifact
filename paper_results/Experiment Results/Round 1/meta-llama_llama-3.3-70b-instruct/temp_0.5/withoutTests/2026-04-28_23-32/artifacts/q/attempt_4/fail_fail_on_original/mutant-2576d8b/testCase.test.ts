import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
    it("should correctly handle promise rejection with long stack traces", () => {
        const promise = q.Q(new Promise((resolve, reject) => reject(new Error("Test error"))));
        return promise.catch((error: any) => {
            expect(error.stack).toContain("Test error");
        });
    });
});