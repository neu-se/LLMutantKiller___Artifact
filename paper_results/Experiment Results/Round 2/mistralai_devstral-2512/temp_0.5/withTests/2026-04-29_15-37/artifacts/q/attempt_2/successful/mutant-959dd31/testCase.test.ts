import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("timeout function behavior", () => {
    it("should reject with timeout error when promise is too slow", async () => {
        const slowPromise = Q.delay(100);
        const timeoutPromise = slowPromise.timeout(10);

        await expect(timeoutPromise).rejects.toBeDefined();
    });
});