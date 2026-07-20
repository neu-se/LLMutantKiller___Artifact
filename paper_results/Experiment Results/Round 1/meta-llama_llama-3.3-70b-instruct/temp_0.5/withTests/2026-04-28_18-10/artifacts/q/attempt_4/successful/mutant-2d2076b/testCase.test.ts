import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delay", () => {
    it("should delay fulfillment when timeout is provided and timeout is not undefined", () => {
        var startTime = new Date().getTime();
        return Q.delay(50).then(() => {
            var endTime = new Date().getTime();
            expect(endTime - startTime).toBeGreaterThan(40);
        });
    });

    it.skip("should reject when timeout is undefined", () => {
        return Q.delay().then(
            () => {
                expect(true).toBe(false);
            },
            (error) => {
                expect(error).not.toBeUndefined();
            }
        );
    });
});