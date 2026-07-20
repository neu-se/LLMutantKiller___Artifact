import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.allSettled", () => {
    it("should return a promise that resolves with an array of settled states", () => {
        const promises = [Q(1), Q(2), Q.reject(3)];
        return Q.allSettled(promises).then((results) => {
            expect(results).toEqual([
                { state: "fulfilled", value: 1 },
                { state: "fulfilled", value: 2 },
                { state: "rejected", reason: 3 },
            ]);
        });
    });
});