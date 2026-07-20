// testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.set", () => {
    it("should set a property with the correct key and value", async () => {
        const target = {};
        const key = "specificKey";
        const value = "specificValue";

        await Q(target).set(key, value);

        expect((target as any)[key]).toBe(value);
        expect((target as any)["wrongKey"]).toBeUndefined();
    });
});