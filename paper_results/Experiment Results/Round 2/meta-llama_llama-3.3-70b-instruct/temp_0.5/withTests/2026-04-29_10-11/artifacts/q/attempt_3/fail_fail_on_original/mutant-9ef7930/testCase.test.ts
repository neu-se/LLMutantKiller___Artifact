import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.race", () => {
    it("should resolve with the first fulfilled promise", async () => {
        const promise1 = Q.delay(100).then(() => "first");
        const promise2 = Q.delay(50).then(() => "second");
        const promises = [promise1, promise2];
        const result = await Q.race(promises);
        expect(result).toBe("second");
    });
});