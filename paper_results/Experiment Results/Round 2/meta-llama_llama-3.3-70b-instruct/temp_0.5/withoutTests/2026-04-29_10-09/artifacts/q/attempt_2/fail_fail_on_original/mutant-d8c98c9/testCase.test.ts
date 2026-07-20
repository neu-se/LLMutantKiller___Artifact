import { Q } from "../../../../../q.js";

describe("Q", () => {
    it("should handle domain exit in runSingle", () => {
        const domain = {
            enter: jest.fn(),
            exit: jest.fn(),
        };
        const task = () => {
            throw new Error("Test error");
        };
        const runSingle = Q.nextTick.runSingle;
        expect(() => runSingle(task, domain)).toThrowError("Test error");
        expect(domain.exit).toHaveBeenCalledTimes(1);
    });
});