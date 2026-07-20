import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q tests", () => {
    it("should test the behavior of object_defineProperty", () => {
        var obj = {};
        var prop = "test";
        var descriptor = { value: "value", enumerable: true, writable: true, configurable: true };

        Object.defineProperty(obj, prop, descriptor);
        expect(obj).toHaveProperty(prop);
    });
});