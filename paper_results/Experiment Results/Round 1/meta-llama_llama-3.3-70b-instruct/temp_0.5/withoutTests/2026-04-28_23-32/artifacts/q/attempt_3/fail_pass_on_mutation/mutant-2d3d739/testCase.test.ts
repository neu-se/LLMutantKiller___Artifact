import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should define properties correctly", () => {
        var obj = {};
        var prop = "test";
        var descriptor = {
            value: "testValue",
            configurable: true
        };

        var object_defineProperty = Object.defineProperty || function (obj, prop, descriptor) {
            obj[prop] = descriptor.value;
            return obj;
        };

        object_defineProperty(obj, prop, descriptor);

        expect(obj[prop]).toBe("testValue");
    });
});