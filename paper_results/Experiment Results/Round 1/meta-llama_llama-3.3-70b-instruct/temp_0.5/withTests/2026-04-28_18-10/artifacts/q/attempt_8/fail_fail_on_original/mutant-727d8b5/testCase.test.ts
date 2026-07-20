import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
    it("should reject after all promises are rejected with the correct error message", async () => {
        var deferreds = [q.defer(), q.defer()];
        var promises = [deferreds[0].promise, deferreds[1].promise];

        var promise = q.any(promises);

        deferreds[0].reject("error1");
        deferreds[1].reject("error2");

        try {
            await promise;
            expect(true).toBe(false);
        } catch (error: any) {
            expect(error.message).toBe("Q can't get fulfillment value from any promise, all promises were rejected. Last error message: error2");
        }
    }, 10000);
});