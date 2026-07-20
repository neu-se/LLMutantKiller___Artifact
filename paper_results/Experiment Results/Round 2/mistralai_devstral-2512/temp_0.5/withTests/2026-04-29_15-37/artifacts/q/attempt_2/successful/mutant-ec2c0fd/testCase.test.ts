import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with generator", () => {
    it("should handle generator with StopIteration undefined", async () => {
        const result = await Q.async(function* () {
            yield Q.delay(10);
            return "success";
        })();
        expect(result).toBe("success");
    });
});