import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q dispatch function", () => {
    it("should dispatch an object, op, and args", () => {
        const object = Q(5);
        const op = "get";
        const args = ["valueOf"];

        const result = Q(object).dispatch(op, args);

        expect(result).not.toBeUndefined();
    });
});