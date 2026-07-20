// testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.set", () => {
    it("should set property and verify exact behavior", async () => {
        const target = {};
        const key = "testKey";
        const value = "testValue";

        // This will pass on original code but fail on mutated code
        // because mutated code passes empty array instead of [key, value]
        await Q(target).set(key, value);

        // Verify the property was set with the exact key
        expect((target as any)[key]).toBe(value);

        // Verify no other properties were set
        expect(Object.keys(target).length).toBe(1);
        expect(Object.keys(target)[0]).toBe(key);
    });
});