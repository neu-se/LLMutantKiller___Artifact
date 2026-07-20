import { Q } from "./q.js";

describe("Q post method", () => {
    it("should dispatch with the correct operation name", () => {
        const dispatchSpy = jest.fn();
        const object = {
            dispatch: dispatchSpy,
        };
        const name = "test";
        const args = ["arg1", "arg2"];
        Q.post(object, name, args);
        expect(dispatchSpy).toHaveBeenCalledTimes(1);
        expect(dispatchSpy).toHaveBeenCalledWith("post", [name, args]);
    });
});