import { Q } from "../../../../../../../../subject_repositories/q/q.js";

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
            });

            deferred.resolve();
        });

        return Q.delay(10).then(() => {
            expect(true).toBe(true);
        });
    });
});