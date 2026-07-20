import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.nsend", () => {
    it("should call the method with the provided arguments", () => {
        const object = {
            myMethod: jest.fn(),
        };

        Q.nsend(object, "myMethod", "arg1", "arg2");

        expect(object.myMethod).toHaveBeenCalledTimes(1);
        expect(object.myMethod).toHaveBeenCalledWith("arg1", "arg2", expect.any(Function));
    });
});