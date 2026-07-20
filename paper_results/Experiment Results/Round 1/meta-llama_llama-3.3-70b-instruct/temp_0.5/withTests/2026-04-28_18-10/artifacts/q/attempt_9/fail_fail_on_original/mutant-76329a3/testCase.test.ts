import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.fbind", () => {
    it("should return a function that returns a value when called", () => {
        var originalFunction = function (a: any, b: any) {
            return a + b;
        };
        var bound = Q.fbind(originalFunction, 1);
        var result = bound(2);
        expect(typeof result).toBe("number");
    });
});