import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any progress notifications", () => {
    it("should send progress notifications with index and value", () => {
        const deferred1 = Q.defer();
        const deferred2 = Q.defer();
        const progressValues: Array<{ index: number; value: string }> = [];

        // Schedule notifications and resolutions
        Q.delay(50).then(() => {
            deferred1.notify("a");
        });
        Q.delay(100).then(() => {
            deferred2.notify("b");
            deferred2.resolve();
        });
        Q.delay(150).then(() => {
            deferred1.notify("c");
            deferred1.resolve();
        });

        return Q.any([deferred1.promise, deferred2.promise])
            .delay(250)
            .then(
                () => {
                    expect(progressValues).toEqual([
                        { index: 0, value: "a" },
                        { index: 1, value: "b" }
                    ]);
                },
                undefined,
                (progressValue) => {
                    progressValues.push(progressValue);
                }
            );
    });
});