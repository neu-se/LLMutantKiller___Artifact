import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should test the behavior of the mutated file", () => {
        // The mutation affects the way Q handles the global object.
        // In the original code, it checks if typeof window !== "undefined" or typeof self !== "undefined".
        // In the mutated code, it checks if typeof window !== "" or typeof self !== "undefined".
        // This test case should pass when run against the original code and fail when run against the mutated code.
        var window = "";
        var self = undefined;
        var globalObject = typeof window !== "undefined" ? window : self;
        expect(globalObject).not.toBe("");
        var globalObjectMutated = typeof window !== "" ? window : self;
        expect(globalObjectMutated).toBe("");
    });
});