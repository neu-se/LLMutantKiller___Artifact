describe("Q", () => {
    it("should define properties using Object.defineProperty", () => {
        const Q = require("../../../../../../../../subject_repositories/q/q");
        const obj = {};
        const prop = "test";
        const descriptor = { value: "testValue", configurable: true };
        Q.object_defineProperty(obj, prop, descriptor);
        expect(obj[prop]).toBe("testValue");
        expect(typeof Q.object_defineProperty).toBe("function");
    });
});