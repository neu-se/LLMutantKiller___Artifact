import { Q } from "../../../../../../../../subject_repositories/q/q.js";

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

        // In the mutated code, domain.exit() is not called, so this should fail
        expect(domain.exit).toHaveBeenCalledTimes(0);
    });
});