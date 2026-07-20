import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.nfapply", () => {
    it("should call the provided function with the given arguments when called with a function and arguments", () => {
        const callback = jest.fn((arg1: any, arg2: any) => {
            return arg1 + arg2;
        });
        const args = [1, 2];
        Q.nfapply(callback, args);
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(1, 2);
    });
});