import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should set Q.longStackSupport to true when Q_DEBUG is set and then reject a promise", () => {
        process.env.Q_DEBUG = "true";
        Q.longStackSupport = true;
        const promise = Q.Promise((resolve, reject) => {
            reject(new Error("Test error"));
        });
        promise.catch((error: any) => {
            expect(Q.longStackSupport).toBe(true);
        });
        delete process.env.Q_DEBUG;
    });
});