import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("q", () => {
    it("should test the behavior of the mutated file", async () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const messages: any[] = [];

        // Simulating the original behavior of promiseDispatch
        promise.promiseDispatch = function (resolve: any, op: any, args: any) {
            if (messages) {
                messages.push(args);
            }
        };

        deferred.resolve(10);

        expect(messages.length).toBe(0);
    });
});