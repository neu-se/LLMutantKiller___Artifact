import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.allSettled", () => {
    it("should return a promise that is fulfilled with an array of promise state snapshots", () => {
        const promises = [Q.resolve(1), Q.reject(2), Q.resolve(3)];
        return Q.allSettled(promises).then((snapshots) => {
            expect(snapshots).toEqual([
                { state: "fulfilled", value: 1 },
                { state: "rejected", reason: 2 },
                { state: "fulfilled", value: 3 },
            ]);
        });
    });
});