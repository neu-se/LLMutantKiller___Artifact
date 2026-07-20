import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('trackRejection function', () => {
    it('should track rejection when trackUnhandledRejections is true', () => {
        Q.resetUnhandledRejections();
        Q.trackUnhandledRejections = true;
        var promise = Q.reject("Test rejection");
        Q.trackRejection(promise, "Test rejection");
        expect(Q.getUnhandledReasons()).toEqual(["(no stack) Test rejection"]);
    });

    it('should not track rejection when trackUnhandledRejections is false', () => {
        Q.resetUnhandledRejections();
        Q.trackUnhandledRejections = false;
        var promise = Q.reject("Test rejection");
        Q.trackRejection(promise, "Test rejection");
        expect(Q.getUnhandledReasons()).toEqual([]);
    });

    it('should track rejection when trackUnhandledRejections is true and then set to false', () => {
        Q.resetUnhandledRejections();
        Q.trackUnhandledRejections = true;
        var promise = Q.reject("Test rejection");
        Q.trackRejection(promise, "Test rejection");
        Q.trackUnhandledRejections = false;
        expect(Q.getUnhandledReasons()).toEqual(["(no stack) Test rejection"]);
    });
});