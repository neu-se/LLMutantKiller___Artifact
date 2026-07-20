import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delay", () => {
    it("should delay fulfillment", () => {
        const originalDelay = Q.delay;
        const startTime = new Date().getTime();
        return Q.delay("what", 50).then((value) => {
            const endTime = new Date().getTime();
            expect(endTime - startTime).toBeGreaterThan(40);
            expect(value).toBe("what");
            Q.delay = originalDelay;
        });
    });

    it.skip("should throw an error when called without arguments", () => {
        expect(() => Q.delay()).toThrow();
    });
});