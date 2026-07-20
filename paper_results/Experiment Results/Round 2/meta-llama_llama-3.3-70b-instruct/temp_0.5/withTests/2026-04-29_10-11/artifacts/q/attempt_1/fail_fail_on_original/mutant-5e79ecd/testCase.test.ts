import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should correctly handle the done method", () => {
        var promise = Q();
        var fulfilled = false;
        var rejected = false;
        var progress = false;

        promise.done(
            () => { fulfilled = true; },
            () => { rejected = true; },
            () => { progress = true; }
        );

        expect(fulfilled).toBe(true);
        expect(rejected).toBe(false);
        expect(progress).toBe(false);
    });
});