import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should delete a property when delete is called with a string", () => {
        var obj = { a: 1 };
        var promise = Q(obj);
        return promise.del("a").then(function () {
            expect(obj).toEqual({});
        });
    });
});