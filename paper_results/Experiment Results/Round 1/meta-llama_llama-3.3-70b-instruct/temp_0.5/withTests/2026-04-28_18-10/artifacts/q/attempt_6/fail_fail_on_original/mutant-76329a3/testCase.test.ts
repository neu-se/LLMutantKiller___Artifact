import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.fbind", () => {
    it("should return a function that calls the original function with the given arguments when the original function is called", () => {
        var originalFunction = jest.fn(function (a: any, b: any) {
            return a + b;
        });
        var bound = Q.fbind(originalFunction, 1);
        bound(2);
        expect(originalFunction).toHaveBeenCalledTimes(1);
        expect(originalFunction).toHaveBeenCalledWith(1, 2);
    });
});