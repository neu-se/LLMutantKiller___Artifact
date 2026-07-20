import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.spread", () => {
    it("should call the callback with the spread values", () => {
        var array = [1, 2, 3];
        return Q.spread(array, function(a, b, c) {
            expect(a).toBe(1);
            expect(b).toBe(2);
            expect(c).toBe(3);
        });
    });
});