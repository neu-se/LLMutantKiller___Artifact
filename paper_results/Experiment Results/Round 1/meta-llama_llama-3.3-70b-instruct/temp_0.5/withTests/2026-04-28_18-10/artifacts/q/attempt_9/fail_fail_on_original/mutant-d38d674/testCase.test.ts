import { Q } from "../../q.js";

describe("Q.makePromise", () => {
    it("should not throw an error when the descriptor does not have the operation and fallback is undefined", () => {
        const descriptor = {};
        expect(() => Q.makePromise(descriptor)).not.toThrowError();
    });
});