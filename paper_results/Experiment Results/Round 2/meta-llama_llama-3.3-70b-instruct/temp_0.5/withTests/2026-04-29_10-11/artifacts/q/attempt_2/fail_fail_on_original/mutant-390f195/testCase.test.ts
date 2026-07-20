import { Q } from "../../../../../q.js";

describe("makeStackTraceLong", () => {
    it("should correctly set the stack property of the error", () => {
        const error = new Error();
        const p = { stack: "test stack", stackCounter: 10 };
        Q.makeStackTraceLong(error, p);
        expect(typeof error.stack).toBe("string");
    });
});