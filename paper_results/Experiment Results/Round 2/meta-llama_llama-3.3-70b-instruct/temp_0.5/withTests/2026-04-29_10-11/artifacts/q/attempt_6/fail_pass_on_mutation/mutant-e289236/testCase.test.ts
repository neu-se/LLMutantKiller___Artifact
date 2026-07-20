import * as q from "../../../../../../../../../../../subject_repositories/q/q";

describe("q", () => {
    it("should test the behavior of the mutated file", async () => {
        const deferred = q.defer();
        const promise = deferred.promise;
        const messages: any[] = [];

        deferred.resolve(10);
        promise.then(() => {}, () => {}, () => {
            messages.push("progress");
        });

        expect(messages.length).toBe(0);
    });
});