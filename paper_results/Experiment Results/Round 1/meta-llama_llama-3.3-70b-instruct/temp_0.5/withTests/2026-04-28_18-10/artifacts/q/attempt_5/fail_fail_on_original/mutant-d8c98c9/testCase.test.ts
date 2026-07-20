import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Testing Q library", () => {
    it("should test the behavior of Q library", () => {
        const domain = { enter: jest.fn(), exit: jest.fn() };
        const error = new Error();

        Q.nextTick(function () {
            try {
                throw error;
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