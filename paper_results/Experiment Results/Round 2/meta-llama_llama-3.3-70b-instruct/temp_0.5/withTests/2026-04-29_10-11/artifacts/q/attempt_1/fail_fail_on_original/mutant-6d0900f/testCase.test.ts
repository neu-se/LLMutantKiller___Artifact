import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection reporting", () => {
    it("should not report a resolve, then reject", () => {
        const deferred = Q.defer();
        deferred.resolve();
        deferred.reject();

        expect(Q.getUnhandledReasons().length).toEqual(0);
    });
});