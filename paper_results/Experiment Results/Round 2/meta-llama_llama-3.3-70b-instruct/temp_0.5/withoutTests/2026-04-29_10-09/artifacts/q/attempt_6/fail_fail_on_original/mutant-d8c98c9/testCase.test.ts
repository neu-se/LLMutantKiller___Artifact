import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle domain exit in runSingle", () => {
        const domain = {
            enter: jest.fn(),
            exit: jest.fn(),
        };
        const task = () => {
            throw new Error("Test error");
        };
        const originalRunSingle = q.nextTick.runSingle;
        jest.spyOn(q.nextTick, 'runSingle').mockImplementation((task, domain) => {
            try {
                task();
            } catch (e) {
                if (domain) {
                    domain.exit();
                }
                throw e;
            }
        });
        try {
            q.nextTick(task, domain);
        } catch (e) {
            expect(e.message).toBe("Test error");
        }
        expect(domain.exit).toHaveBeenCalledTimes(1);
        q.nextTick.runSingle.mockRestore();
    });
});