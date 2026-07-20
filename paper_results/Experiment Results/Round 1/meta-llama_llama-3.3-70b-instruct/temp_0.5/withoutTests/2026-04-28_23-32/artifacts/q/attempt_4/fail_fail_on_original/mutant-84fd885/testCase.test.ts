import { Q } from "../../../../../q";

describe("Q.nsend", () => {
    it("should call the method with the provided arguments", () => {
        const object = {
            myMethod: jest.fn(),
        };

        const promise = Q.nsend(object, "myMethod", "arg1", "arg2");
        expect(object.myMethod).toHaveBeenCalledTimes(0);
        return promise.then(() => {
            expect(object.myMethod).toHaveBeenCalledTimes(1);
            expect(object.myMethod).toHaveBeenCalledWith("arg1", "arg2", expect.any(Function));
        });
    });
});