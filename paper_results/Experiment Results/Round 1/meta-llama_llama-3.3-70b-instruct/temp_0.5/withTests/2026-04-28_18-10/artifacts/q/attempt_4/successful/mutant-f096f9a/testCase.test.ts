import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", function () {
    it("should fulfill when one promise is resolved", function () {
        var promises = [Q.reject("error1"), Q("value2")];
        var promise = Q.any(promises);

        return promise.then(function (value) {
            expect(value).toBe("value2");
        });
    });
});