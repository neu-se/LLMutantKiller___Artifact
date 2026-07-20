import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should define properties correctly", () => {
        var obj = {};
        var prop = "test";
        var descriptor = {
            value: "testValue",
            configurable: true
        };

        var object_defineProperty = Q.object_defineProperty;

        expect(typeof object_defineProperty).toBe("function");

        object_defineProperty(obj, prop, descriptor);

        expect(obj[prop]).toBe("testValue");
    });
});