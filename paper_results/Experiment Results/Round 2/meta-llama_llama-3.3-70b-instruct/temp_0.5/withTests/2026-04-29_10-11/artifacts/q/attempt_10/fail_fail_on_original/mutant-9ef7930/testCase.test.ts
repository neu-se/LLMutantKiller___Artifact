import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.race", () => {
    it("should not iterate past the length of the array", async () => {
        const array = [Q(1), Q(2), Q(3)];
        const result = await Q.race(array);
        expect(result).toBe(1);
    });
});