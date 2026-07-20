import { Q } from "../../../../../q.js";

describe("Q.any", () => {
    it("should notify progress when a promise in the array is rejected", (done) => {
        const promises = [Q.reject("error"), Q.resolve("value")];
        let notified = false;
        Q.any(promises).progress((progress) => {
            notified = true;
            expect(progress).toEqual({ index: 0, value: "error" });
        });
        setTimeout(() => {
            expect(notified).toBe(true);
            done();
        }, 100);
    });
});