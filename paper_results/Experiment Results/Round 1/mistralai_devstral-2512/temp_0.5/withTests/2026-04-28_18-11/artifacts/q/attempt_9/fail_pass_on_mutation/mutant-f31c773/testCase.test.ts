// testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.set", () => {
    it("should correctly set property with non-empty key and value", async () => {
        const target = {};
        const key = "validKey";
        const value = "validValue";

        await Q(target).set(key, value);

        // This will fail on mutated code because empty array is passed instead of [key, value]
        // causing the property not to be set
        expect((target as any)[key]).toBe(value);
        expect(Object.prototype.hasOwnProperty.call(target, key)).toBe(true);
    });
});