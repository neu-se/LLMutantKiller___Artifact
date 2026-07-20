import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should test the behavior of Q.any", () => {
        var deferreds = [Q.defer(), Q.defer()];
        var promises = [deferreds[0].promise, deferreds[1].promise];

        var promise = Q.any(promises);

        deferreds[0].resolve("Success");
        deferreds[1].reject("Error");

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