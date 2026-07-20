import Q from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q.delete", () => {
    it("should throw an error when the operation name is empty", () => {
        const obj = { foo: "bar" };
        const promise = Q(obj).dispatch("", ["foo"]);
        return expect(promise).rejects.toThrow();
    });
});