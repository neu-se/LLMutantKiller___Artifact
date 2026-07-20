import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
    it("should handle promise rejection with error object correctly", () => {
        const promise = Q.reject(new Error("Test error"));
        const resolvedPromise = Q.resolve();

        Q.all([promise, resolvedPromise]).then((result: any) => {
            expect(result).toBeUndefined();
        }).catch((err: any) => {
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe("Test error");
        });
    });
});