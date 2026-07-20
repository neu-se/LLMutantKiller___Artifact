import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delay", () => {
    it("should delay fulfillment when timeout is provided", () => {
        var startTime = new Date().getTime();
        return Q(10).delay(50).then(() => {
            var endTime = new Date().getTime();
            expect(endTime - startTime).toBeGreaterThan(40);
        });
    });

    it("should not reject when timeout is provided", () => {
        return Q(10).delay(50).then(
            (value) => {
                expect(value).toBe(10);
            },
            (error) => {
                expect(true).toBe(false);
            }
        );
    });
});