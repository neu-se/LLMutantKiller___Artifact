// testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.set", () => {
    it("should set a property and verify the exact key was used", async () => {
        const target = {};
        const key = "exactKey";
        const value = "exactValue";

        await Q(target).set(key, value);

        // Verify the exact key was set (not some other key)
        expect(Object.keys(target)).toContain(key);
        expect((target as any)[key]).toBe(value);
    });
});