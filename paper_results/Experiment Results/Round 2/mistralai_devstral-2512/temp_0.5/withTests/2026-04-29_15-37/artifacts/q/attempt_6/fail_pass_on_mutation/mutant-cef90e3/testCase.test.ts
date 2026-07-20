import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.then behavior", () => {
    it("should handle chained then calls with rejection", async () => {
        const deferred = Q.defer();
        let firstThenCount = 0;
        let secondThenCount = 0;
        let catchCount = 0;

        const promise = deferred.promise
            .then(() => {
                firstThenCount++;
                throw new Error("test error");
            })
            .then(
                () => {
                    secondThenCount++;
                },
                () => {
                    catchCount++;
                }
            );

        deferred.resolve(42);
        await promise;

        expect(firstThenCount).toBe(1);
        expect(secondThenCount).toBe(0);
        expect(catchCount).toBe(1);
    });
});