import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise constructor inspect parameter", () => {
    it("should use default inspect when not provided", () => {
        const promise = Q.Promise({});
        const inspectResult = promise.inspect();
        expect(inspectResult).toEqual({ state: "unknown" });
    });
});