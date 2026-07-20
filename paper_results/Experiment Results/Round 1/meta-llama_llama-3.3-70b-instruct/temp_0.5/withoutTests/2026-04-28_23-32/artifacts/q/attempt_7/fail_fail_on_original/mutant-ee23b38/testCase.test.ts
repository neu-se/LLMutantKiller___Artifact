import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should set a property on an object", async () => {
        const promise = Q({ foo: "bar" });
        const result = promise.set("baz", "qux");
        await expect(result).resolves.toEqual({ foo: "bar", baz: "qux" });
    });
});