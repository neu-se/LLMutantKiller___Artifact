import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("thenResolve mutation test", () => {
    it("should resolve with the provided value", async () => {
        const result = await Q.delay(10).thenResolve("test_value");
        expect(result).toBe("test_value");
    });
});