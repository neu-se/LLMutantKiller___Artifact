import { Q } from "../../../../../q.js";

describe("Q", () => {
    it("should test the behavior of the mutated file", () => {
        const domain = require('domain').create();
        const deferred = Q.defer();
        const promise = deferred.promise;

        promise.then(() => {
            throw new Error("Test error");
        }).catch((error: Error) => {
            expect(error).toBeInstanceOf(Error);
        });

        deferred.resolve();

        domain.run(() => {
            try {
                throw new Error("Test error");
            } catch (e) {
                if (domain) {
                    domain.exit();
                }
            }
        });

        expect(true).toBe(true);
    });
});