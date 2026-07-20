import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should define properties correctly", () => {
        var obj = {};
        var prop = "test";
        var descriptor = {
            value: "testValue",
            configurable: true
        };

        expect(Object.defineProperty).toBeDefined();
        expect(typeof Object.defineProperty).toBe("function");

        Object.defineProperty(obj, prop, descriptor);

        expect(obj[prop]).toBe("testValue");
    });
});