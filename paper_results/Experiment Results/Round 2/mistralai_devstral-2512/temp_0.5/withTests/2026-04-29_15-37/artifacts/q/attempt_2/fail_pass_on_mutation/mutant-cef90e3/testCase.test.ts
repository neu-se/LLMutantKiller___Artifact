import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.then behavior", () => {
    it("should not call the fulfillment callback twice when promise is already resolved", async () => {
        let fulfillmentCount = 0;
        const deferred = Q.defer();
        deferred.resolve(42);

        const promise = deferred.promise.then(() => {
            fulfillmentCount++;
            return "fulfilled";
        });

        await promise;
        expect(fulfillmentCount).toBe(1);
    });
});