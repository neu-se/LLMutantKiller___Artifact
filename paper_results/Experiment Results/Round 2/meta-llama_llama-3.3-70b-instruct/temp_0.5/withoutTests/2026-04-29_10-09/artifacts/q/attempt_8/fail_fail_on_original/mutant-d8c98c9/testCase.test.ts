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
        const nextTick = q.nextTick;
        try {
            nextTick(task, domain);
        } catch (e) {
            expect(e.message).toBe("Test error");
        }
        expect(domain.exit).toHaveBeenCalledTimes(1);
    });
});