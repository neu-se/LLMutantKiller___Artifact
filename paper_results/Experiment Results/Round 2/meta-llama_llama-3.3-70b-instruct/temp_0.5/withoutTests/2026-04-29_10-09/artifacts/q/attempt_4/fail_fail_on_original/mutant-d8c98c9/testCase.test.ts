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
        const nextTick = Q.nextTick;
        expect(() => nextTick(task, domain)).toThrowError("Test error");
        expect(domain.exit).toHaveBeenCalledTimes(1);
    });
});