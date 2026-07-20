import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.race", () => {
    it("should throw an error when given an empty array", async () => {
        try {
            await Q.race([]);
            expect(true).toBe(false);
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });
});