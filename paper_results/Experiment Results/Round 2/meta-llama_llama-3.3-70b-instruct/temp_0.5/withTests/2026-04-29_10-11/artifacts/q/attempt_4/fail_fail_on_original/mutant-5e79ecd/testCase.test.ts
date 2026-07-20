import Q from '../../q';

describe("Q", () => {
    it("should correctly handle the done method", () => {
        var promise = Q();
        var fulfilled = false;
        var rejected = false;
        var progress = false;

        promise.then(
            () => { fulfilled = true; },
            () => { rejected = true; },
            () => { progress = true; }
        );

        expect(fulfilled).toBe(true);
        expect(rejected).toBe(false);
        expect(progress).toBe(false);
    });
});