import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
    it("should correctly handle the mutation", () => {
        const error = new Error();
        const p = { stack: "test stack", stackCounter: 10 };
        expect(() => {
            makeStackTraceLong(error, p);
        }).toThrowError(TypeError);
    });
});