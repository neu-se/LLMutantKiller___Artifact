import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
    it("should correctly set __minimumStackCounter__ property", () => {
        const error = new Error();
        const p = { stackCounter: 10 };
        makeStackTraceLong(error, p);
        expect(error.__minimumStackCounter__).toBe(10);
    });
});