import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.then behavior", () => {
    it("should handle promise resolution with chained then calls", async () => {
        const deferred = Q.defer();
        let executionOrder = [];

        const promise = deferred.promise
            .then(value => {
                executionOrder.push(`first:${value}`);
                return value + 1;
            })
            .then(value => {
                executionOrder.push(`second:${value}`);
                return value + 1;
            })
            .then(value => {
                executionOrder.push(`third:${value}`);
                return value;
            });

        deferred.resolve(10);
        await promise;

        expect(executionOrder).toEqual(["first:10", "second:11", "third:12"]);
    });
});