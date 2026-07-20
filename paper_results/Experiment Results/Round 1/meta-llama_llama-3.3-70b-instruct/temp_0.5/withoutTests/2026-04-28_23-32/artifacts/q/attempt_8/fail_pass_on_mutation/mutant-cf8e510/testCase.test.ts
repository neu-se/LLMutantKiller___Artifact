import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
    it("should handle promise rejection with error object correctly", () => {
        const promise = Q.reject(new Error("Test error"));
        const error = new Error("Another error");

        Q.all([promise, Q.resolve(error)]).catch((err: any) => {
            expect(err).toBe(error);
        });
    });
});