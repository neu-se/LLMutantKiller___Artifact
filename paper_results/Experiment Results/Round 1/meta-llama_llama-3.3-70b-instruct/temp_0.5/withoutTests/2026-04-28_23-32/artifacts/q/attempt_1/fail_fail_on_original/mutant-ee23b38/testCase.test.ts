import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q Promise", () => {
    it("should set a property on an object", () => {
        const promise = Q({ foo: "bar" });
        const result = promise.set("baz", "qux");
        expect(result).resolves.toEqual({ foo: "bar", baz: "qux" });
    });
});