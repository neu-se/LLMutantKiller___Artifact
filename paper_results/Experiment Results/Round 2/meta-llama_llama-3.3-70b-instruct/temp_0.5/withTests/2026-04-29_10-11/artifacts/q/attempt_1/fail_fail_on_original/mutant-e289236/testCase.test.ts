import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("q", () => {
    it("should test the behavior of the mutated file", async () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const messages: any[] = [];

        promise.promiseDispatch = function (resolve: any, op: any, args: any) {
            messages.push(args);
            if (op === "when" && args[1]) {
                // progress operand
            }
        };

        deferred.resolve(10);

        expect(messages.length).toBe(0);
    });
});