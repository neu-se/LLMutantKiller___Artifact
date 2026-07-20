import { Q } from "../../../../../q";

describe("Q dispatch function", () => {
    it("should dispatch an object, op, and args", () => {
        const object = Q(5);
        const op = "get";
        const args = ["valueOf"];

        expect(() => Q(object).dispatch(op, args)).not.toThrow();
    });
});