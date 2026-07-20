import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Testing Q library", () => {
    it("should test the behavior of Q library", () => {
        const Q = require("../../../../../../../../subject_repositories/q/q");
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

        // Test the mutated code
        const mutatedDomain = { enter: jest.fn(), exit: jest.fn() };

        Q.nextTick(function () {
            try {
                throw new Error();
            } catch (e) {
                if (mutatedDomain) {
                    // Do nothing
                }
                throw e;
            }
        });

        expect(mutatedDomain.exit).toHaveBeenCalledTimes(0);
    });
});