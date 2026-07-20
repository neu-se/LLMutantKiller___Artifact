import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.fbind", () => {
    it("should return a function that calls the original function with the given arguments", () => {
        var originalFunction = function (a: any, b: any) {
            return a + b;
        };
        var bound = Q.fbind(originalFunction, 1);
        expect(typeof bound).toBe("function");
        var result = bound(2);
        expect(result).toBeUndefined();
    });
});