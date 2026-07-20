import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Testing Q library", () => {
    it("should test the behavior of Q library", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const domain = { enter: jest.fn(), exit: jest.fn() };

        Q.nextTick(function () {
            try {
                throw new Error();
            } catch (e) {
                if (domain) {
                    domain.exit();
                }
                throw e;
            }
        });

        expect(domain.exit).toHaveBeenCalledTimes(1);
    });
});