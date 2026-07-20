import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.spread", () => {
    it("should call the callback with the spread values", () => {
        var array = [1, 2, 3];
        return Q.spread(array, function(a: number, b: number, c: number) {
            expect(a).toBe(1);
            expect(b).toBe(2);
            expect(c).toBe(3);
            return a + b + c;
        }).then(function(result: number) {
            expect(result).toBe(6);
        });
    });
});