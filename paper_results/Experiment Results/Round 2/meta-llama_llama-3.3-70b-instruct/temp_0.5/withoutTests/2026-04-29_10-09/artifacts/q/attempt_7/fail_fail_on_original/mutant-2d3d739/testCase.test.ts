describe("Q", () => {
    it("should throw an error when object_defineProperty is false", () => {
        const Q = require("../../../../../../../../subject_repositories/q/q");
        Q.object_defineProperty = false;
        const obj = {};
        const prop = "test";
        const descriptor = { value: "testValue", configurable: true };
        expect(() => {
            if (Q.object_defineProperty) {
                Object.defineProperty(obj, prop, descriptor);
            } else {
                throw new Error("object_defineProperty is false");
            }
        }).toThrowError("object_defineProperty is false");
    });
});