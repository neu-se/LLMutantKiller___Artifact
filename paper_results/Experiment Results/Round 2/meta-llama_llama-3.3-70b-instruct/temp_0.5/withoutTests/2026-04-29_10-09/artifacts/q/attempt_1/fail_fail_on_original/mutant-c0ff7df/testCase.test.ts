import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.get", () => {
    it("should dispatch a get operation with the correct property name", () => {
        const obj = { foo: "bar" };
        const key = "foo";
        const result = Q.get(obj, key);
        expect(result.inspect().state).toBe("fulfilled");
        expect(result.inspect().value).toBe("bar");
    });
});