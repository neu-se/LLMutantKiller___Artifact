import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should reject when delete is called with an empty string", () => {
        var obj = { a: 1 };
        var promise = Q(obj);
        return promise.del("").then(function () {
            expect(true).toBe(false);
        }, function (error) {
            expect(error.message).toBe("Q can't delete non-existent key: ");
        });
    });
});