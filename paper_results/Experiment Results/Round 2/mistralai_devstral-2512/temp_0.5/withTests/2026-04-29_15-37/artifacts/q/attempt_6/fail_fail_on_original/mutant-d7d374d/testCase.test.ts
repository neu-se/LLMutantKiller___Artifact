const QModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

// Access the internal deprecate function from the Q module
const getDeprecateFunction = () => {
    // The Q module is a function that returns the Q object when called
    // We need to extract the deprecate function from the module's source
    const moduleCode = QModule.toString();
    const deprecateMatch = moduleCode.match(/function deprecate\\([^)]+\\)\\s*\\{([^}]+)\\}/);
    if (!deprecateMatch) throw new Error("Could not find deprecate function");

    // Extract and evaluate the deprecate function
    const deprecateCode = `(${deprecateMatch[0]})`;
    return eval(deprecateCode);
};

describe("deprecate function console check", () => {
    it("should not throw when console is undefined", () => {
        const deprecate = getDeprecateFunction();
        const originalConsole = global.console;
        (global as any).console = undefined;

        const testFn = () => "test";
        const deprecatedFn = deprecate(testFn, "testFn", "newFn");

        expect(() => {
            deprecatedFn();
        }).not.toThrow();

        global.console = originalConsole;
    });
});