import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
    it("should call onProgress when a promise in the array is rejected", () => {
        const promises = [Q.reject("error"), Q.resolve("value")];
        let onProgressCalled = false;
        Q.any(promises).progress(() => {
            onProgressCalled = true;
        });
        expect(onProgressCalled).toBe(true);
    });
});