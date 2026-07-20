import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.nfapply", () => {
    it("should return a promise when called with a function and arguments", () => {
        const callback = function(arg1, arg2) {
            return arg1 + arg2;
        };
        const args = [1, 2];
        const result = Q.nfapply(callback, args);
        expect(result.then).toBeInstanceOf(Function);
    });
});