import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delay", () => {
    it("should delay fulfillment when timeout is provided", () => {
        var startTime = new Date().getTime();
        return Q.delay(50).then(() => {
            var endTime = new Date().getTime();
            expect(endTime - startTime).toBeGreaterThan(40);
        });
    });

    it("should reject when timeout is not provided", () => {
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