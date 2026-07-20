import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.race", () => {
    it("should throw an error when iterating past the length of the array", async () => {
        const promises = [Q.delay(100), Q.delay(50)];
        const mutatedPromises = [...promises, undefined];
        try {
            await Q.race(mutatedPromises);
            expect(true).toBe(false);
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });
});