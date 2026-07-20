import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q dispatch function", () => {
    it("should dispatch an object, op, and args", () => {
        const object = q(5);
        const op = "get";
        const args = ["valueOf"];

        const result = object.dispatch(op, args);
        expect(typeof result).toBe("object");
        expect(result.inspect).toBeInstanceOf(Function);
        expect(result.inspect()).toEqual({ state: "fulfilled", value: 5 });
    });
});