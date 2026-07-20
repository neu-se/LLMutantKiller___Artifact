import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delay", () => {
    it("should delay fulfillment", () => {
        const startTime = new Date().getTime();
        return Q("what").delay(50).then((value) => {
            const endTime = new Date().getTime();
            expect(endTime - startTime).toBeGreaterThan(40);
            expect(value).toBe("what");
        });
    });

    it("should not delay rejection", () => {
        return Q.reject("error").delay(50).then(null, (error) => {
            expect(error).toBe("error");
        });
    });
});