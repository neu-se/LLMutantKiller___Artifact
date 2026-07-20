import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should throw an error with a long stack trace when Q_DEBUG is set", () => {
        process.env.Q_DEBUG = "true";
        Q.longStackSupport = true;
        const promise = Q.Promise((resolve, reject) => {
            reject(new Error("Test error"));
        });
        promise.catch((error: any) => {
            expect(error.stack).toContain("Q");
        });
        delete process.env.Q_DEBUG;
    });
});