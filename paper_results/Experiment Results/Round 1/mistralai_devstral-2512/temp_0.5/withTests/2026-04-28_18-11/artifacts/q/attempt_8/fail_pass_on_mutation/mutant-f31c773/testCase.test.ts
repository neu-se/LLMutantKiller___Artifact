// testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.set", () => {
    it("should set property with specific key and value", async () => {
        const target = {};
        const key = "uniqueKey123";
        const value = "uniqueValue456";

        await Q(target).set(key, value);

        // This assertion will fail on mutated code because the key won't be set
        // when empty array is passed instead of [key, value]
        expect((target as any)[key]).toBe(value);
        expect(Object.keys(target)).toEqual([key]);
    });
});