import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.nsend", () => {
    it("should call the method with the provided arguments", () => {
        const object = {
            myMethod: jest.fn(),
        };

        const promise = Q.nsend(object, "myMethod", "arg1", "arg2");
        expect(promise).rejects.toThrow();
    });
});