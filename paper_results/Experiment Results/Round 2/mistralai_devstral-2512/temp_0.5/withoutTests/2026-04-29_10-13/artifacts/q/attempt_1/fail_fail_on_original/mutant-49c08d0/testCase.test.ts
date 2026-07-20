import { Q } from "./q";

describe("Promise constructor with inspect parameter", () => {
    it("should use default inspect when not provided", () => {
        const promise = Q.Promise({});
        const inspectResult = promise.inspect();
        expect(inspectResult).toEqual({ state: "unknown" });
    });
});