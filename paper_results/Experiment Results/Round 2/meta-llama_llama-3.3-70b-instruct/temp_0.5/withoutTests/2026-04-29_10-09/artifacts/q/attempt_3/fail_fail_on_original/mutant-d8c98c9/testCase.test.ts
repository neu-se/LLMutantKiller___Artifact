import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle domain exit in runSingle", () => {
        const domain = {
            enter: jest.fn(),
            exit: jest.fn(),
        };
        const task = () => {
            throw new Error("Test error");
        };
        const originalRunSingle = Q.nextTick.runSingle;
        jest.spyOn(Q.nextTick, 'runSingle').mockImplementation((task, domain) => {
            try {
                task();
            } catch (e) {
                if (domain) {
                    domain.exit();
                }
                throw e;
            }
        });
        expect(() => Q.nextTick.runSingle(task, domain)).toThrowError("Test error");
        expect(domain.exit).toHaveBeenCalledTimes(1);
        Q.nextTick.runSingle.mockRestore();
    });
});