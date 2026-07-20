import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should define properties using Object.defineProperty", () => {
        const obj = {};
        const prop = "test";
        const descriptor = { value: "testValue", configurable: true };
        const originalDefineProperty = Object.defineProperty;
        Object.defineProperty = Q.object_defineProperty;
        Q.object_defineProperty(obj, prop, descriptor);
        expect(obj[prop]).toBe("testValue");
        Object.defineProperty = originalDefineProperty;
        delete obj[prop];
    });
});