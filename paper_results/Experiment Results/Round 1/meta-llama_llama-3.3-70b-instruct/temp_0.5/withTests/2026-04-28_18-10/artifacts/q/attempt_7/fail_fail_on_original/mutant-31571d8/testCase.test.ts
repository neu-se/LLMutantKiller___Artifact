import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should include the correct stack trace when an error is thrown", () => {
        var error = new Error("Test error");
        var promise = q.Q(function() {
            throw error;
        });
        promise.catch(function(rejection) {
            expect(rejection.stack).toContain("Test error");
        });
    });
});