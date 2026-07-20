import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly filter stack traces", () => {
        const error = new Error("Test error");
        const promise = Q((resolve, reject) => {
            reject(error);
        });

        promise.catch((err: any) => {
            const stack = err.stack;
            expect(stack).toContain("Q.defer");
        });
    });
});