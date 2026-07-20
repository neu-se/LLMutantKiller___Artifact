import { Q } from "./q.js";

describe("Q post method", () => {
    it("should dispatch with the correct operation name", () => {
        const object = {
            dispatch: jest.fn(),
        };
        const name = "test";
        const args = ["arg1", "arg2"];
        Q.post(object, name, args);
        expect(object.dispatch).toHaveBeenCalledTimes(1);
        expect(object.dispatch).toHaveBeenCalledWith("post", [name, args]);
    });
});