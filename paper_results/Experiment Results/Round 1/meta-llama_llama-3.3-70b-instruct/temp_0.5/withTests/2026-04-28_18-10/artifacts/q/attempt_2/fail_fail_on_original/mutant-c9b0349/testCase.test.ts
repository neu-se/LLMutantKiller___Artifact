import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter stack traces correctly", () => {
        const error = new Error("Test error");
        const originalStack = error.stack;

        Q.longStackSupport = true;

        const promise = Q((resolve, reject) => {
            reject(error);
        });

        promise.catch((err: any) => {
            const filteredStack = err.stack;
            expect(filteredStack).not.toContain("node_modules");
        });
    });
});