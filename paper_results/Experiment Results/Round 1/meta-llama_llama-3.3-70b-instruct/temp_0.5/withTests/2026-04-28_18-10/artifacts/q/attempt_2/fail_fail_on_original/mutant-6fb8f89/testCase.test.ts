import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.spread", () => {
    it("should call the callback with the spread values", () => {
        var deferred = Q.defer();
        var promise = Q.spread([Q(1), Q(2)], function (a: any, b: any) {
            expect(a).toBe(1);
            expect(b).toBe(2);
        });
        return promise;
    });
});