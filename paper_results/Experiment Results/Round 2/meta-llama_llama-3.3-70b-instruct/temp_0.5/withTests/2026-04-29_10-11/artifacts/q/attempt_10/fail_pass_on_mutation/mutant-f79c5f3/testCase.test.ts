import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should test the behavior of Q.any with a resolved promise", () => {
        var deferred = Q.defer();
        var promise = Q.any([deferred.promise]);

        deferred.resolve("Success");

        return promise.then(
            function (value: any) {
                expect(value).toBe("Success");
            },
            function (error: any) {
                expect(true).toBe(false);
            }
        );
    });
});