import { Q } from "../../../../../q";

describe("Q", () => {
    it("should test the behavior of the mutated file", () => {
        const domain = require('domain').create();

        domain.on('error', (err: Error) => {
            expect(err).toBeInstanceOf(Error);
        });

        domain.run(() => {
            const deferred = Q.defer();
            const promise = deferred.promise;

            promise.then(() => {
                throw new Error("Test error");
            }).catch((error: Error) => {
                expect(error).toBeInstanceOf(Error);
                throw error; // rethrow the error
            });

            deferred.resolve();
        });

        return Q.delay(10).then(() => {
            expect(true).toBe(false); // this should not be reached
        });
    });
});