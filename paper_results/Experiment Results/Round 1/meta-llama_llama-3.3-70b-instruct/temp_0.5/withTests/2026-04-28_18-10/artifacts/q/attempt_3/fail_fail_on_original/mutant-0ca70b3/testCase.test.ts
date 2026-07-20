import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter stack traces correctly", () => {
        const error = new Error("Test error");
        const promise = Q.reject(error);
        const stackTrace = promise.catch((err: any) => err.stack);
        expect(stackTrace).resolves.not.toContain("qStartingLine");
    });
});