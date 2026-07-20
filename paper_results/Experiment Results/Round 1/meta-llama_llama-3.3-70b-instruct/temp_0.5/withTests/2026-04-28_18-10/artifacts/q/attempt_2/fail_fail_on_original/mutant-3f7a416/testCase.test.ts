import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.allSettled", () => {
    it("should return a promise that resolves with an array of settled states", () => {
        const promises = [q.Q(1), q.Q(2), q.Q.reject(3)];
        return q.Q.allSettled(promises).then((results) => {
            expect(results).toEqual([
                { state: "fulfilled", value: 1 },
                { state: "fulfilled", value: 2 },
                { state: "rejected", reason: 3 },
            ]);
        });
    });
});