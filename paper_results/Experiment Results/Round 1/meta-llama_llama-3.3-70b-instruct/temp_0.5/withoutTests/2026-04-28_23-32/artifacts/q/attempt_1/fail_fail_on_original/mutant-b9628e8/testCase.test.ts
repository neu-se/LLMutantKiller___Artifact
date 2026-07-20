import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should dispatch delete correctly", () => {
        const promise = Q({ foo: "bar" });
        const result = promise["delete"]("foo");
        expect(result).resolves.toEqual({ foo: "bar" });
    });
});