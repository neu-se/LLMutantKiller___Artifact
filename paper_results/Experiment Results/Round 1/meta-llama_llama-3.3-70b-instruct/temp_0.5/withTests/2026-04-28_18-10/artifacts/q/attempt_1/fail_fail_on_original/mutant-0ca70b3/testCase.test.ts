import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter stack traces correctly", () => {
        const error = new Error("Test error");
        const promise = Q.reject(error);
        const filteredStack = promise.catch((err) => err.stack);
        expect(filteredStack).not.toContain("q.js");
    });
});