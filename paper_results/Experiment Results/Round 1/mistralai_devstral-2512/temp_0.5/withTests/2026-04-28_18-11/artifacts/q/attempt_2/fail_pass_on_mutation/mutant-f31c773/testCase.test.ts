// testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.set", () => {
    it("should set a property on the target object with the given key and value", async () => {
        const target = {};
        const key = "testKey";
        const value = "testValue";

        await Q(target).set(key, value);

        expect((target as any)[key]).toBe(value);
    });
});