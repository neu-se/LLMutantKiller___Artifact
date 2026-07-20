import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong function", () => {
    it("should handle error and promise correctly", () => {
        var error = new Error("Test error");
        var promise = Q.defer().promise;
        var originalStack = error.stack;

        makeStackTraceLong(error, promise);

        expect(error.stack).not.toBe(originalStack);
    });

    it("should not modify the error stack if error is null or promise is not defined", () => {
        var error = new Error("Test error");
        var originalStack = error.stack;

        makeStackTraceLong(null, null);
        expect(error.stack).toBe(originalStack);

        makeStackTraceLong(error, null);
        expect(error.stack).toBe(originalStack);
    });
});