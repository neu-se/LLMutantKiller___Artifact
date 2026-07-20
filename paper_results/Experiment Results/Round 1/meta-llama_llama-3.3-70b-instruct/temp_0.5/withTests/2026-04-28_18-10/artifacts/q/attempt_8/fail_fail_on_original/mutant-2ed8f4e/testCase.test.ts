import { Q } from "../../../../../q.js";

describe("Q", () => {
    it("should filter out internal frames from stack traces", () => {
        const error = new Error();
        const stackString = error.stack;
        const filteredStackString = Q.filterStackString(stackString);
        expect(filteredStackString).toHaveLength(stackString.length - 1);
    });
});