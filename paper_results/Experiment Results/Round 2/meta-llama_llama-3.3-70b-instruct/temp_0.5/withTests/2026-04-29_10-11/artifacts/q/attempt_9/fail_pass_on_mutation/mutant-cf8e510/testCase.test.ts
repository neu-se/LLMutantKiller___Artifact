import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should test the behavior of makeStackTraceLong", () => {
        var error = new Error("Test error");
        var promise = Q.reject(error);
        var hasStacks = true;
        var qFileName = "q.js";
        var qStartingLine = 1;
        var qEndingLine = 100;

        Q.longStackSupport = true;

        promise.then(null, function(err) {
            expect(err.stack).toContain("q.js");
        });
    });
});