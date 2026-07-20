import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should return a promise with inspect method", () => {
        const promise = Q({ foo: "bar" });
        expect(promise.inspect).toBeInstanceOf(Function);
        expect(promise.inspect()).toEqual({ state: "fulfilled", value: { foo: "bar" } });
    });
});