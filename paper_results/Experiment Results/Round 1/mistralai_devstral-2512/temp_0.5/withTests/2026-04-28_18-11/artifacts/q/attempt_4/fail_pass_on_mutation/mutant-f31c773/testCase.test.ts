// testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.set", () => {
    it("should correctly pass the key and value to the dispatch method", async () => {
        const target = {};
        const key = "testKey";
        const value = "testValue";

        // This test verifies that the key and value are actually passed through
        // The mutation changes [key, value] to [] which would break this
        await Q(target).set(key, value);

        expect((target as any)[key]).toBe(value);
    });
});