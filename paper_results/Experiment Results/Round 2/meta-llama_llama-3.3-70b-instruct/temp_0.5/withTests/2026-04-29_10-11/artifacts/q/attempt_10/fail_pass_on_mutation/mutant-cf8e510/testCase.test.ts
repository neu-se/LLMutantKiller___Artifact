import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should test the behavior of makeStackTraceLong", () => {
        var error = new Error("Test error");
        var promise = Q.reject(error);

        promise.then(null, function(err) {
            if (typeof error === "object" && promise.stack) {
                throw new Error("Expected error stack to be modified");
            }
        });
    });
});