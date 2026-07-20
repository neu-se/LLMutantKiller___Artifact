import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q library functionality", () => {
    it("should resolve promises correctly", () => {
        return Q(10).then((value) => {
            expect(value).toBe(10);
        });
    });
});