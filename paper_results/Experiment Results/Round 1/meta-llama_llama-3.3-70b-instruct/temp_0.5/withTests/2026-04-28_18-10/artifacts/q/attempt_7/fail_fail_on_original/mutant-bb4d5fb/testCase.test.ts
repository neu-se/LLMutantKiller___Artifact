import { Q } from "./q";

describe("Q", () => {
    it("should correctly filter out internal frames from stack traces", () => {
        const error = new Error();
        const originalStack = error.stack;
        const filteredStack = Q.filterStackString(originalStack);
        expect(filteredStack).not.toContain("at Object.<anonymous>");
    });
});