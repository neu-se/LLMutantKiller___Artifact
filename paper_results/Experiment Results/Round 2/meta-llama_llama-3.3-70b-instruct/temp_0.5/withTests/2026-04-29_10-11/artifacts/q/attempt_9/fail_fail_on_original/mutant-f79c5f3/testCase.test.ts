import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should test the behavior of Q.any with two rejections and a pending promise", () => {
        var deferreds = [Q.defer(), Q.defer(), Q.defer()];
        var promises = [deferreds[0].promise, deferreds[1].promise, deferreds[2].promise];

        var promise = Q.any(promises);

        deferreds[0].reject("Error 1");
        deferreds[1].reject("Error 2");

        return promise.then(
            function (value: any) {
                expect(true).toBe(false);
            },
            function (error: any) {
                expect(error.message).toBe("Q can't get fulfillment value from any promise, all promises were rejected. Last error message: Error 2");
            }
        );
    });
});