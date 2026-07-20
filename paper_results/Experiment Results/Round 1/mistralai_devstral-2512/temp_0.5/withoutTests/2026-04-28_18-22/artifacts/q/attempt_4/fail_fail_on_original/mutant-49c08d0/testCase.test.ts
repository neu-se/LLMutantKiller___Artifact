const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise constructor with custom inspect", () => {
    it("should use custom inspect when provided", () => {
        const customInspect = () => ({ state: "custom" });
        const promise = new Q.Promise({}, void 0, customInspect);
        expect(promise.inspect()).toEqual({ state: "custom" });
    });
});