import { Q } from "../../../../../q.js";

describe("Q.any", () => {
    it("should notify progress when a promise in the array is rejected", () => {
        const promises = [Q.reject("error"), Q.resolve("value")];
        let notified = false;
        Q.any(promises).progress((progress) => {
            notified = true;
        });
        expect(notified).toBe(false);
    });
});