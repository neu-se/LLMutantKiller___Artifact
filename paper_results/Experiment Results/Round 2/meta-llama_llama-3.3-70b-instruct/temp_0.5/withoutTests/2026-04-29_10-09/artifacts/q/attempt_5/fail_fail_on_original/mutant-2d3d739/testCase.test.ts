describe("Q", () => {
    it("should throw an error when object_defineProperty is false", () => {
        const Q = require("../../../../../../../../subject_repositories/q/q");
        const obj = {};
        const prop = "test";
        const descriptor = { value: "testValue", configurable: true };
        Q.object_defineProperty = false;
        expect(() => Q.object_defineProperty(obj, prop, descriptor)).toThrow();
    });
});