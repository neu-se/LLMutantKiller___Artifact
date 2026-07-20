import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle process.domain correctly", () => {
        const originalProcessDomain = global.process?.domain;
        try {
            global.process = { ...global.process, domain: { bind: jest.fn() } };
            const promise = Q();
            promise.done(() => {}, () => {}, () => {});
            if (global.process && global.process.domain) {
                expect(global.process.domain.bind).toHaveBeenCalledTimes(1);
            } else {
                expect(true).toBe(false); // Should fail if process.domain is not defined
            }
        } finally {
            if (originalProcessDomain) {
                global.process = { ...global.process, domain: originalProcessDomain };
            } else {
                delete global.process.domain;
            }
        }
    });
});