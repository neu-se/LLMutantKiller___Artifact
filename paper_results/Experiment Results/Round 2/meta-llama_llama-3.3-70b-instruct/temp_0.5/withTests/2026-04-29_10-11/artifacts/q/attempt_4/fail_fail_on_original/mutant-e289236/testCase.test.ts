import * as q from "../../../../../../../../../../../subject_repositories/q/q";

describe("q", () => {
    it("should test the behavior of the mutated file", async () => {
        const deferred = q.defer();
        const promise = deferred.promise;
        const messages: any[] = [];

        promise.promiseDispatch = function (resolve: any, op: any, args: any) {
            if (messages) {
                messages.push(args);
            }
        };

        deferred.resolve(10);
        promise.then(() => {}, () => {}, () => {
            messages.push("progress");
        });

        expect(messages.length).toBe(0);
    });
});