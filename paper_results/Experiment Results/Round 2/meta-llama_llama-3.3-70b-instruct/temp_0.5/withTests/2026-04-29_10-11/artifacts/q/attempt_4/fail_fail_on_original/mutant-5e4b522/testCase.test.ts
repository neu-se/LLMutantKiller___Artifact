import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should test the behavior of the mutated file", () => {
        // The mutation affects the way Q handles the global object.
        // In the original code, it checks if typeof window !== "undefined" or typeof self !== "undefined".
        // In the mutated code, it checks if typeof window !== "" or typeof self !== "undefined".
        // This test case should pass when run against the original code and fail when run against the mutated code.
        var window = "";
        var self = undefined;
        expect(() => {
            var global = typeof window !== "undefined" ? window : self;
        }).not.toThrow();
        expect(() => {
            var global = typeof window !== "" ? window : self;
        }).toThrow();
    });
});