import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q promise library", () => {
    it("should make a stack trace long when an error occurs", () => {
        const error = new Error();
        const promise = Q.reject(error);
        promise.catch((e) => {
            expect(e.stack).toContain("makeStackTraceLong");
        });
    });
});