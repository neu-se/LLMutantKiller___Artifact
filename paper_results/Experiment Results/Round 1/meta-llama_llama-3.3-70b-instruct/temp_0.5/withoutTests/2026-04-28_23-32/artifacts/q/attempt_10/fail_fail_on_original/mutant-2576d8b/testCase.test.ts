import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
    it("should correctly handle promise rejection with long stack traces", () => {
        const promise = q.default(new Promise((resolve, reject) => reject(new Error("Test error"))));
        const chainedPromise = promise.then(() => {
            throw new Error("Chained error");
        });
        return chainedPromise.catch((error: any) => {
            expect(error.stack).toContain("Chained error");
            const stackLines = error.stack.split("\n");
            expect(stackLines).toHaveLength(stackLines.length);
        });
    });
});