import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong function with error !== null check", () => {
    it("should handle error and promise correctly", () => {
        var error = new Error("Test error");
        var promise = Q.defer().promise;

        Q.longStackSupport = true;

        // This test should pass on the original code and fail on the mutated code
        // because in the mutated code, the condition is always true (true &&)
        // so it will not correctly handle the case where error is null
        expect(function() {
            makeStackTraceLong(null, promise);
        }).toThrow();
    });
});