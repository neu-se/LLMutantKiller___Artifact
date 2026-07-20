import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.allSettled", () => {
    it("should return an array of settled promises", async () => {
        const promises = [Q.resolve(1), Q.resolve(2), Q.reject("error")];
        const result = await Q.allSettled(promises);
        expect(result).toEqual([
            { state: 'fulfilled', value: 1 },
            { state: 'fulfilled', value: 2 },
            { state: 'rejected', reason: 'error' }
        ]);
    });
});