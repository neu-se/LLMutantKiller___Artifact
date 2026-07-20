import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should define properties using Object.defineProperty", () => {
        const obj = {};
        const prop = "test";
        const descriptor = { value: "testValue" };
        const originalDefineProperty = Object.defineProperty;
        Object.defineProperty = Q.object_defineProperty;
        Q.object_defineProperty(obj, prop, descriptor);
        expect(obj[prop]).toBe(descriptor.value);
        Object.defineProperty = originalDefineProperty;
    });
});