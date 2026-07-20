import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q Promise", () => {
    it("should set a property on an object", async () => {
        const promise = Q({ foo: "bar" });
        const result = await promise.set("baz", "qux");
        expect(result).toEqual({ foo: "bar", baz: "qux" });
    });
});