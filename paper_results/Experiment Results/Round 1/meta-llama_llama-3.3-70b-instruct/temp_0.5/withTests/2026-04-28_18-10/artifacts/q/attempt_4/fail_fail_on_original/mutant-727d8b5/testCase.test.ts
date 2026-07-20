import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
    it("should reject after all promises are rejected with the correct error message", () => {
        var deferreds = [Q.defer(), Q.defer()];
        var promises = [deferreds[0].promise, deferreds[1].promise];

        var promise = Q.any(promises);

        deferreds[0].reject("error1");
        deferreds[1].reject("error2");

        return promise.then(
            () => {
                expect(true).toBe(false);
            },
            (error: any) => {
                expect(error.message).toBe("Q can't get fulfillment value from any promise, all promises were rejected. Last error message: error2");
            }
        );
    });
});