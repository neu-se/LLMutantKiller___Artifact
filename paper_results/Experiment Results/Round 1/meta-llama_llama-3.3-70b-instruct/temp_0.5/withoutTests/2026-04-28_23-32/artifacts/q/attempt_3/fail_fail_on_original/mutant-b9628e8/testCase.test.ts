import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should dispatch delete correctly", () => {
        const obj = { foo: "bar" };
        const promise = Q(obj);
        const result = promise["delete"]("foo");
        expect(result).resolves.not.toThrow();
        expect(promise.dispatch("get", ["foo"])).resolves.toBeUndefined();
    });
});