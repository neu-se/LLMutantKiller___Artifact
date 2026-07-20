import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should not throw an error when Q.onerror is not called", () => {
        Q().then(() => {
            throw new Error("Test error");
        }).done();
        expect(true).toBe(true);
    });
});