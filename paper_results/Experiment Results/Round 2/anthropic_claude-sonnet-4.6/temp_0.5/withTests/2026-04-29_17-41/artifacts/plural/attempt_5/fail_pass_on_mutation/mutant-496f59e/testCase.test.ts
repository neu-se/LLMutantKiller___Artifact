import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural addRule with string key and function value", () => {
  it("should call function rule with only the word when rule key is a string", () => {
    // Add a string rule with a function that checks it receives NO second argument
    let receivedArgs: any[] = [];
    plural.addRule("testword123", function(w: string, extra: any) {
      receivedArgs = Array.from(arguments);
      return "testwords123";
    });
    
    const result = plural("testword123");
    
    // Original: string rule goes to second branch, calls rule[1](word) - 1 argument
    // Mutated: if(true) always enters first branch, calls rule[1](word, rule[0]) - 2 arguments
    expect(result).toBe("testwords123");
    expect(receivedArgs.length).toBe(1);
  });
});