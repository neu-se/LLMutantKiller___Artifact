import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise", () => {
    it("should handle progress listeners correctly", () => {
        const deferred = Q.defer();
        const progressValues: any[] = [];

        Q.when(deferred.promise, null, null, (progressValue: any) => {
            progressValues.push(progressValue);
        });

        deferred.notify("progress");

        return Q.delay(10).then(() => {
            expect(progressValues).toEqual(["progress"]);
        });
    });
});