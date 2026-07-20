import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should define properties using Object.defineProperty", () => {
        const obj = {};
        const prop = "test";
        const descriptor = { value: "testValue", configurable: true };
        Object.defineProperty(obj, prop, descriptor);
        const qObj = Q(obj);
        expect(qObj[prop]).toBe("testValue");
        delete obj[prop];
    });
});