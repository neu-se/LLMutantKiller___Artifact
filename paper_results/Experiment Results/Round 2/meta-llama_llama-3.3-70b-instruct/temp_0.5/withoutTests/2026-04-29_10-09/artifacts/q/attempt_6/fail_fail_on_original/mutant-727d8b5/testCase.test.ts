import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
    it("should notify progress when a promise in the array is rejected", () => {
        const promises = [Q.reject("error"), Q.resolve("value")];
        let notified = false;
        Q.any(promises).progress(() => {
            notified = true;
        });
        expect(notified).toBe(true);
    });
});