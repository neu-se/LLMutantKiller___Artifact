const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise constructor with custom inspect", () => {
    it("should use default inspect when custom inspect is not provided", () => {
        const promise = new Q.Promise({});
        expect(promise.inspect()).toEqual({ state: "unknown" });
    });
});