import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.nsend", () => {
    it("should call the method with the provided arguments", () => {
        const object = {
            myMethod: jest.fn(),
        };

        const promise = Q.nsend(object, "myMethod", "arg1", "arg2");
        expect(promise).not.toBeNull();
        return promise.then(() => {
            expect(object.myMethod).toHaveBeenCalledTimes(1);
            expect(object.myMethod).toHaveBeenCalledWith("arg1", "arg2", expect.any(Function));
        });
    });
});