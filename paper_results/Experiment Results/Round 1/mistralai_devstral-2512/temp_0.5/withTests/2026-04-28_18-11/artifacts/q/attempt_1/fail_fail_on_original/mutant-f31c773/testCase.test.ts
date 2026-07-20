// testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.set", () => {
    it("should set a property on the target object with the given key and value", async () => {
        const target = { existing: "value" };
        const key = "newProperty";
        const value = "newValue";

        await Q(target).set(key, value);

        expect(target[key]).toBe(value);
    });
});