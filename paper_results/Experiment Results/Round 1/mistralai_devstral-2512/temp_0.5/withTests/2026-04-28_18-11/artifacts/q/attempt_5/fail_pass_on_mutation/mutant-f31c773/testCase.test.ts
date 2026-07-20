// testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.set", () => {
    it("should set multiple properties correctly", async () => {
        const target = {};
        const key1 = "key1";
        const value1 = "value1";
        const key2 = "key2";
        const value2 = "value2";

        await Q(target).set(key1, value1);
        await Q(target).set(key2, value2);

        expect((target as any)[key1]).toBe(value1);
        expect((target as any)[key2]).toBe(value2);
    });
});