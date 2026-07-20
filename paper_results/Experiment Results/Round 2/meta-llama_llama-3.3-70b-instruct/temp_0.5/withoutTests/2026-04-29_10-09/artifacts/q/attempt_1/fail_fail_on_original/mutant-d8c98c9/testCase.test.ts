import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle domain exit in runSingle", () => {
        const domain = {
            enter: jest.fn(),
            exit: jest.fn(),
        };
        const task = jest.fn();
        const runSingle = Q.nextTick.runSingle;
        runSingle(task, domain);
        expect(domain.exit).toHaveBeenCalledTimes(1);
    });
});