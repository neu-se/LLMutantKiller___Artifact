import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should dispatch delete correctly", async () => {
        const obj = { foo: "bar" };
        const promise = Q(obj);
        const result = promise.dispatch("delete", ["foo"]);
        await expect(result).resolves.not.toThrow();
        await expect(promise.dispatch("get", ["foo"])).resolves.toBeUndefined();
    });
});