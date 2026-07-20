import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong function", () => {
    it("should correctly handle error stack traces", () => {
        var error = new Error();
        var promise = Q();
        Q.longStackSupport = true;
        makeStackTraceLong(error, promise);
        expect(error.stack).not.toBeNull();
        expect(error.__minimumStackCounter__).toBeGreaterThan(0);
    });
});