// Test case to detect the mutation in the timeout function
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("timeout function behavior", () => {
    it("should reject with timeout error when promise is too slow", async () => {
        const slowPromise = new Promise<void>((resolve) => {
            setTimeout(() => resolve(), 100);
        });

        const timeoutPromise = Q(slowPromise).timeout(10);

        await expect(timeoutPromise).rejects.toBeDefined();
    });
});