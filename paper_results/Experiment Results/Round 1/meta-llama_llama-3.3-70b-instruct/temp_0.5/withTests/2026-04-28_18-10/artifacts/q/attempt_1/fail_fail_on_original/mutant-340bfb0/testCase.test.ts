import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
    it("should correctly set __minimumStackCounter__ property on error object", () => {
        const error = new Error();
        const promise = Q();
        promise.stackCounter = 10;
        makeStackTraceLong(error, promise);
        expect(error.__minimumStackCounter__).toBe(10);
    });
});