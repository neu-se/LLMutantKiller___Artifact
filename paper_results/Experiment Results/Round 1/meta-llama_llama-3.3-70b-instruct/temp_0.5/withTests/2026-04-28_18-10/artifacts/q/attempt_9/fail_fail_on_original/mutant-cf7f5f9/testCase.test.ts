import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should throw an error when an error occurs in a promise chain", () => {
        const error = new Error("Test error");

        try {
            Q(Promise.resolve()).then(() => {
                throw error;
            }).done();
        } catch (e) {
            expect(e).toBe(error);
        }
    });
});