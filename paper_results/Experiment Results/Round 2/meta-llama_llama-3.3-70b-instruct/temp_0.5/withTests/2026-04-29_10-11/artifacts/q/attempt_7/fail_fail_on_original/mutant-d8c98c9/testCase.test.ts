import { Q } from "../../../../../q.js";

describe("Q", () => {
    it("should test the behavior of the mutated file", () => {
        const domain = require('domain').create();
        domain.run(() => {
            const deferred = Q.defer();
            const promise = deferred.promise;

            promise.then(() => {
                throw new Error("Test error");
            }).catch((error: Error) => {
                expect(error).toBeInstanceOf(Error);
            });

            deferred.resolve();

            // If domain.exit() is called, the test should pass
            // If domain.exit() is not called, the test should fail
            expect(domain.exit).toHaveBeenCalledTimes(1);
        });
    });
});