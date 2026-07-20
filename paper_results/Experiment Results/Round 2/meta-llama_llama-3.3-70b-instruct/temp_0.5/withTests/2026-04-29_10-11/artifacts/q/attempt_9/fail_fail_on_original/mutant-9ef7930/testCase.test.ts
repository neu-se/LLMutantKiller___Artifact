import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.race", () => {
    it("should iterate over the array only once", async () => {
        const promises = [Q.delay(100), Q.delay(50)];
        const result = await Q.race(promises);
        expect(result).toBe("second");
    });
});