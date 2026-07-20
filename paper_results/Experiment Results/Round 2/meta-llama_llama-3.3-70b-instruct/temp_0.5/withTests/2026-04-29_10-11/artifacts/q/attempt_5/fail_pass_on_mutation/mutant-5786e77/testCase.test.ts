import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise spread method", () => {
    it("should call the callback with the spread values", () => {
        var promise = q([1, 2, 3]).spread(function (a: any, b: any, c: any) {
            expect(a).toBe(1);
            expect(b).toBe(2);
            expect(c).toBe(3);
        });
        return promise;
    });
});