import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should call onUnhandledError with the correct context when process.domain is truthy', () => {
        const onUnhandledErrorSpy = jest.fn();
        const processDomainSpy = jest.fn();
        const originalProcess = global.process;
        global.process = { domain: { bind: processDomainSpy } } as any;

        Q.done(Q.resolve(), null, null, null);
        onUnhandledErrorSpy();
        expect(processDomainSpy).toHaveBeenCalledTimes(1);
        expect(processDomainSpy).toHaveBeenCalledWith(onUnhandledErrorSpy);

        global.process = originalProcess;
    });
});