import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q tests", () => {
    it("should test the behavior of object_defineProperty", () => {
        var obj = {};
        var prop = "test";
        var descriptor = { value: "value", configurable: true };

        Object.defineProperty(obj, prop, descriptor);
        expect(obj[prop]).toBe("value");

        var promise = Q(obj);
        promise.then(function (obj) {
            expect(obj[prop]).toBe("value");
        });
    });
});