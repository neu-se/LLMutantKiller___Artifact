import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should handle nextTick correctly", () => {
        const deferred = q.defer();
        const originalNextTick = q.nextTick;
        const nextTickSpy = jest.spyOn(q, 'nextTick');
        q.nextTick = () => {};
        q.nextTick(() => {
            deferred.resolve();
        });
        expect(nextTickSpy).toHaveBeenCalledTimes(1);
        q.nextTick = originalNextTick;
        return deferred.promise;
    });
});