const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise constructor inspect parameter", () => {
    it("should use default inspect when not provided", () => {
        // Access the internal Promise constructor through Q.makePromise
        const promise = Q.makePromise({
            "when": function() {
                return "test";
            }
        });
        const inspectResult = promise.inspect();
        expect(inspectResult).toEqual({ state: "unknown" });
    });
});