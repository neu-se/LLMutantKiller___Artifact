import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q dispatch function", () => {
    it("should dispatch an object, op, and args", () => {
        const object = {};
        const op = "test";
        const args = [];
        const dispatchSpy = jest.spyOn(Q, "dispatch");

        Q.dispatch(object, op, args);

        expect(dispatchSpy).toHaveBeenCalledWith(object, op, args);
    });
});