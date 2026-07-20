import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly handle stack traces in promises", () => {
        const error = new Error("Test error");
        const promise = Q.reject(error);

        return promise.catch((err) => {
            expect(err.stack).toContain("Test error");
        });
    });
});