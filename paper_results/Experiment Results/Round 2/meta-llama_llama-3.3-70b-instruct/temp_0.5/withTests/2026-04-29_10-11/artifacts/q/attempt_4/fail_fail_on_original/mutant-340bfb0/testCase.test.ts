import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
    it("should set a property on an error object without throwing an error", () => {
        const error = new Error();
        const promise = Q();
        const stackCounter = promise.stackCounter;
        makeStackTraceLong(error, promise);
        expect(error.__minimumStackCounter__).toBe(stackCounter);
    });
});