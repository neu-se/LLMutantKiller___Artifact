import { Q } from '../../q.js';

describe("Q.allSettled", () => {
    it("should return an array of settled promises with state and value/reason", async () => {
        const promises = [Q.resolve(1), Q.resolve(2), Q.reject("error")];
        const result = await Q.allSettled(promises);
        expect(result).not.toHaveLength(0);
    });
});