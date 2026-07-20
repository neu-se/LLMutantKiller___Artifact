import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Testing Q library", () => {
    it("should test the behavior of Q library", () => {
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