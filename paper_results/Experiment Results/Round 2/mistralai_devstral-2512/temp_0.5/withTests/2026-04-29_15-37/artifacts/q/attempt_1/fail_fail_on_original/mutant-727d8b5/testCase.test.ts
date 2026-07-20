import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any progress notifications", () => {
    it("should send progress notifications with index and value", async () => {
        const deferred1 = Q.defer();
        const deferred2 = Q.defer();
        const progressValues: Array<{ index: number; value: string }> = [];

        // Schedule progress notifications
        setTimeout(() => deferred1.notify("a"), 50);
        setTimeout(() => deferred2.notify("b"), 100);
        setTimeout(() => deferred2.resolve(), 100);
        setTimeout(() => deferred1.notify("c"), 150);
        setTimeout(() => deferred1.resolve(), 150);

        await Q.any([deferred1.promise, deferred2.promise])
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