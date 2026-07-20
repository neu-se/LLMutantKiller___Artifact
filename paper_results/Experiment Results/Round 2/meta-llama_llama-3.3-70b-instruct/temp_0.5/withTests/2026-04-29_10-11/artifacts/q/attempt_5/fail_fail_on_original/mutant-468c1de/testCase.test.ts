import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong function", () => {
    it("should correctly handle error stack traces", () => {
        var error = new Error();
        var promise = Q();
        Q.longStackSupport = true;
        makeStackTraceLong(error, promise);
        expect(Object.prototype.hasOwnProperty.call(error, "__minimumStackCounter__")).toBe(true);
    });
});