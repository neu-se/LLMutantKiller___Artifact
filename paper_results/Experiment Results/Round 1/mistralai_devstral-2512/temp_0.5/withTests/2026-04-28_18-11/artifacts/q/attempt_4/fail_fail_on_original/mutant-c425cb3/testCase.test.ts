import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress notification behavior", () => {
    it("should not notify downstream progress listeners when an error is thrown", () => {
        const deferred = Q.defer();
        let firstProgressCalled = false;
        let secondProgressCalled = false;

        const promise = deferred.promise.then(
            () => {},
            () => {},
            (value: any) => {
                firstProgressCalled = true;
                throw new Error("Progress error");
            }
        );

        promise.then(
            () => {},
            () => {},
            () => {
                secondProgressCalled = true;
            }
        );

        deferred.notify("test");
        deferred.resolve("done");

        return Q.delay(10).then(() => {
            expect(firstProgressCalled).toBe(true);
            expect(secondProgressCalled).toBe(false);
        });
    });
});