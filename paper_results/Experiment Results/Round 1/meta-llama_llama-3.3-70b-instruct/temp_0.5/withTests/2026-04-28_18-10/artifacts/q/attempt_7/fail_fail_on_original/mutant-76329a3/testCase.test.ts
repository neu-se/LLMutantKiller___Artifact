import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.fbind", () => {
    it("should return a function that returns a promise when called", () => {
        var originalFunction = function (a: any, b: any) {
            return Q(a + b);
        };
        var bound = Q.fbind(originalFunction, 1);
        var result = bound(2);
        expect(result.then).toBeInstanceOf(Function);
    });
});