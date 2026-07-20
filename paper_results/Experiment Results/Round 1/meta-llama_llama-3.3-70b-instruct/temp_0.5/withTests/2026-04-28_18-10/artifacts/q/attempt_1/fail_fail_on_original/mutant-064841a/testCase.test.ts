import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should include stack trace information when longStackSupport is enabled", () => {
        Q.longStackSupport = true;
        const promise = Q.defer().promise;
        const error = new Error("Test error");
        promise.then(() => { throw error; });
        return promise.catch((e: any) => {
            expect(e.stack).toContain("q.js");
        });
    });
});