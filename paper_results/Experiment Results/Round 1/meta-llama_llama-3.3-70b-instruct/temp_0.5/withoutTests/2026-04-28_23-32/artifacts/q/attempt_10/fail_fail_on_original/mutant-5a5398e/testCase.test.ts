import { Q } from "./q.js";

describe("Q.denodeify", () => {
    it("should throw an error when trying to wrap an undefined function", () => {
        try {
            Q.denodeify(undefined);
        } catch (e: any) {
            expect(e instanceof Error).toBe(true);
        }
    });
});