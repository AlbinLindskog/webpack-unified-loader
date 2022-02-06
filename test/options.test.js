import { getCompiler, compile } from "./helpers";

describe("validate options", () => {
  
  it("should not accept a missing use option", async () => {
    const compiler = getCompiler("exampleFile.js", {});
    const stats = await compile(compiler);

    expect(stats.compilation.errors).toHaveLength(1);
    expect(stats.compilation.errors[0].error.message).toBe("Cannot `process` without `Parser`")
  });
  
  it("should not accept an empty use array", async () => {
    const compiler = getCompiler("exampleFile.js", {use: []});
    const stats = await compile(compiler);
    
    expect(stats.compilation.errors).toHaveLength(1);
    expect(stats.compilation.errors[0].error.message).toBe("Cannot `process` without `Parser`")
  });
  
  it("should not accept different options", async () => {
    const compiler = getCompiler("exampleFile.js", {wrong: []});
    const stats = await compile(compiler);
    
    const expected = "" +
    "Invalid options object. Unified Loader has been initialized using an options object that does not match the API schema.\n" +
    " - options has an unknown property 'wrong'. These properties are valid:\n" +
    "   object { use? }"
    
    expect(stats.compilation.errors).toHaveLength(1);
    expect(stats.compilation.errors[0].error.message).toBe(expected)
  });
});
