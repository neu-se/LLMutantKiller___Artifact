import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.get function", () => {
    it("should dispatch a 'get' operation for the given key", () => {
        const object = { foo: "bar" };
        const key = "foo";
        const result = Q(object).dispatch("get", [key]);
        expect(result.inspect().value).toBe("bar");
    });
});