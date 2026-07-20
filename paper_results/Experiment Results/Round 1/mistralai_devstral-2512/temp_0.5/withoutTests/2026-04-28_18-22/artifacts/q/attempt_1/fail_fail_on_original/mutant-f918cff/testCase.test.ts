import { Q } from "./q.js";

describe("Promise exception handling", () => {
    it("should reject when an exception occurs in promise dispatch", async () => {
        const promise = Q.Promise({
            "when": function () {
                throw new Error("Test exception");
            }
        });

        await expect(promise).rejects.toThrow("Test exception");
    });
});