import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.fbind", () => {
    it("should return a function", () => {
        var bound = Q.fbind(function (a: any, b: any) {
            return a + b;
        }, 1);
        expect(typeof bound).toBe("function");
    });
});