import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nfapply function", () => {
    it("should not be an empty function", () => {
        const originalNfapply = q.nfapply;
        expect(originalNfapply.toString()).not.toBe("function (callback, args) { }");
    });
});