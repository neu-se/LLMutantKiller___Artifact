import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle process.domain correctly", () => {
        const originalProcess = global.process;
        try {
            global.process = { domain: { bind: jest.fn() } };
            const promise = Q();
            promise.done(() => {}, () => {}, () => {});
            expect(global.process.domain.bind).toHaveBeenCalledTimes(1);
        } finally {
            global.process = originalProcess;
        }
    });
});