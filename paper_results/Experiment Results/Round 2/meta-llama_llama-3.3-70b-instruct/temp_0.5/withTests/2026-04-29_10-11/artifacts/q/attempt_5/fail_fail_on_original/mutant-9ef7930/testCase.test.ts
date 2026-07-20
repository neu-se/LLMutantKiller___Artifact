import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.race", () => {
    it("should not iterate past the length of the array", async () => {
        const spy = jest.fn();
        const promises = [Q.delay(100).then(spy), Q.delay(50).then(spy)];
        await Q.race(promises);
        expect(spy).toHaveBeenCalledTimes(2);
    });
});