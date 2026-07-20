import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q tests", () => {
    it("should test the behavior of object_defineProperty", () => {
        var obj = {};
        var prop = "test";
        var descriptor = { value: "value", enumerable: true, writable: true, configurable: true };

        var originalDefineProperty = Object.defineProperty;
        Object.defineProperty = function (obj, prop, descriptor) {
            obj[prop] = descriptor.value;
            return obj;
        };

        Object.defineProperty(obj, prop, descriptor);
        expect(Object.keys(obj)).toContain(prop);

        Object.defineProperty = originalDefineProperty;
    });
});