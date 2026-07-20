import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.join", () => {
    it("should check the behavior of Q.join", () => {
        var promise1 = Q(1);
        var promise2 = Q(2);
        var promise = Q([promise1, promise2]).spread(function (x, y) {
            if (x !== y) {
                throw new Error("Q can't join: not the same: " + x + " " + y);
            }
            return x;
        });
        return promise.then(function (result) {
            expect(result).toBe(1);
        }).catch(function (error) {
            expect(error.message).toBe("Q can't join: not the same: 1 2");
        });
    });
});