import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("observers called even after throw", () => {
    it("should set threw to true before throwing in fulfilled callback", (done) => {
        let threw = false;
        const deferred = Q.defer();

        Q.when(deferred.promise, function () {
            threw = true;
            throw new Error("test error");
        });

        Q.when(deferred.promise, function () {
            expect(threw).toBe(true);
            done();
        });

        deferred.resolve(10);
    });
});