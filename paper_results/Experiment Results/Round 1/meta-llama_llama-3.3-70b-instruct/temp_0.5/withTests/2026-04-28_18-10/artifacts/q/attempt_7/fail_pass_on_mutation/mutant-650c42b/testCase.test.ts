import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q dispatch function", () => {
    it("should dispatch an object, op, and args", () => {
        const object = q(5);
        const op = "get";
        const args = ["valueOf"];

        const result = object.dispatch(op, args);
        expect(result).not.toBeUndefined();
        expect(typeof result).toBe("object");
    });
});