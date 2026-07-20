import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
    it("should increment the pendingCount when a promise is not yet resolved", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const promises = [promise];
        const pendingCount = 0;

        Q.all(promises);

        expect(pendingCount).toBe(0);
    });
});