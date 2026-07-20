// testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.set", () => {
    it("should fail when key and value are not passed correctly", async () => {
        const target = {};
        const key = "testKey";
        const value = "testValue";

        // This will pass on original code but fail on mutated code
        // because mutated code passes empty array instead of [key, value]
        await Q(target).set(key, value);

        // Verify the property was actually set
        expect((target as any)[key]).toBe(value);

        // Also verify we can set a different property
        const key2 = "testKey2";
        const value2 = "testValue2";
        await Q(target).set(key2, value2);
        expect((target as any)[key2]).toBe(value2);
    });
});