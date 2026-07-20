import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.spread", () => {
    it("should call the callback with the spread values", () => {
        var promise = Q([1, 2]).spread(function (a: number, b: number) {
            expect(a).toBe(1);
            expect(b).toBe(2);
            return a + b;
        });
        return promise.then(function (result: number) {
            expect(result).toBe(3);
        });
    });
});