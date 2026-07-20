import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should handle nextTick correctly", () => {
        const deferred = q.defer();
        const nextTickSpy = jest.spyOn(q, 'nextTick');
        q.nextTick(() => {
            deferred.resolve();
        });
        expect(nextTickSpy).toHaveBeenCalledTimes(1);
        return deferred.promise;
    });
});