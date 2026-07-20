import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack support", () => {
    it("should include the correct stack trace when an error is thrown and long stack support is enabled", () => {
        q.Q.longStackSupport = true;
        var error = new Error("Test error");
        var promise = q.Q(function() {
            throw error;
        });
        promise.catch(function(rejection) {
            expect(rejection.stack).toContain("Test error");
        });
    });
});