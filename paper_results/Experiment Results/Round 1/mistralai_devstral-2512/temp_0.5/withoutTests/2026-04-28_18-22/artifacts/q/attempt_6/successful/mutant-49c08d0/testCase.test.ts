const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise constructor with custom inspect", () => {
    it("should use default inspect when custom inspect is not provided", () => {
        const promise = Q({});
        expect(promise.inspect()).toEqual({ state: "fulfilled", value: {} });
    });
});