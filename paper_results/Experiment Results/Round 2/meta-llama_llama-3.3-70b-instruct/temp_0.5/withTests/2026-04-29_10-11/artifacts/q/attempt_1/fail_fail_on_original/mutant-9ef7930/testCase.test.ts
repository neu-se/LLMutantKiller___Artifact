import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.race", () => {
    it("should resolve with the first fulfilled promise", async () => {
        const promise1 = Q.delay(100).then(() => "first");
        const promise2 = Q.delay(50).then(() => "second");
        const result = await Q.race([promise1, promise2]);
        expect(result).toBe("second");
    });

    it("should reject with the first rejected promise", async () => {
        const promise1 = Q.delay(100).then(() => { throw new Error("first"); });
        const promise2 = Q.delay(50).then(() => { throw new Error("second"); });
        try {
            await Q.race([promise1, promise2]);
            expect(true).toBe(false);
        } catch (error) {
            expect(error.message).toBe("second");
        }
    });
});