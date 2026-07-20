import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise spread method", () => {
    it("should call the callback with the spread values", () => {
        var promise = Q.spread([1, 2, 3], function (a, b, c) {
            expect(a).toBe(1);
            expect(b).toBe(2);
            expect(c).toBe(3);
        });
        return promise;
    });
});