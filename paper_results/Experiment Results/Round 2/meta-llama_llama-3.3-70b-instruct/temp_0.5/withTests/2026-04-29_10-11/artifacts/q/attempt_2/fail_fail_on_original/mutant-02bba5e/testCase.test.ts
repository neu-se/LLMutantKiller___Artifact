import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong function", () => {
    it("should handle error and promise correctly", () => {
        var error = new Error("Test error");
        var promise = Q.defer().promise;

        Q.longStackSupport = true;
        var originalStack = error.stack;

        makeStackTraceLong(error, promise);

        expect(error.stack).not.toBe(originalStack);
    });
});