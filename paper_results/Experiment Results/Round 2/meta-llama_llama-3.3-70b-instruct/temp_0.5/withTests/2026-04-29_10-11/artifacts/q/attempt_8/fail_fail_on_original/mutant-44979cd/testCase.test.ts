import { Q } from "../../../q.js";

describe("Q", () => {
    it("should pass when exports is an object and module is an object", () => {
        expect(typeof Q).toBe("function");
    });
});