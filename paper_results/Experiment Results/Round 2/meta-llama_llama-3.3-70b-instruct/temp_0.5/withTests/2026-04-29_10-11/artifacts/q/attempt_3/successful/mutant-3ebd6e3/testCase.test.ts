import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.allSettled", () => {
    it("should return a promise that is fulfilled with an array of promise state snapshots", () => {
        const promises = [Q(1), Q.reject(2), Q(3)];
        return Q.allSettled(promises).then((snapshots) => {
            expect(snapshots.length).toBe(3);
            expect(snapshots[0].state).toBe("fulfilled");
            expect(snapshots[1].state).toBe("rejected");
            expect(snapshots[2].state).toBe("fulfilled");
        });
    });
});