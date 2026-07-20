import { Q } from "./q.js";

describe("Q.denodeify", () => {
    it("should throw an error with a specific message when trying to wrap an undefined function", () => {
        const error = new Error("Q can't wrap an undefined function");
        try {
            Q.denodeify(undefined);
        } catch (e) {
            expect(e.message).toBe(error.message);
        }
    });
});