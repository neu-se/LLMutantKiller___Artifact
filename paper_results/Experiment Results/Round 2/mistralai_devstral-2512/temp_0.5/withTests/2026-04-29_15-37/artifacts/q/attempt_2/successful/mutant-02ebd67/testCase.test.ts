import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async generator behavior", () => {
    it("should correctly handle generator with 'next' operation", async () => {
        const result = await Q.async(function* () {
            const val = yield Q(10);
            return val + 5;
        })();
        expect(result).toBe(15);
    });
});