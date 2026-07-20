import { Q } from "./q.js";

describe("Q promise rejection behavior", () => {
    it("should properly handle promise rejection in finally", async () => {
        let errorThrown = false;
        try {
            await Q.reject(new Error("test error")).finally(() => {
                throw new Error("finally error");
            });
        } catch (e) {
            errorThrown = true;
        }
        expect(errorThrown).toBe(true);
    });
});