import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle process.domain correctly", () => {
        const originalProcessDomain = process.domain;
        try {
            process.domain = { bind: () => {} };
            const promise = Q();
            promise.done(() => {}, () => {}, () => {});
        } finally {
            process.domain = originalProcessDomain;
        }
    });
});