import {getCompiler, compile, parserPlugin, compilerPlugin, compilerPluginWithError} from "./helpers";


describe("validate unify setup", () => {
  
  it("should propagate missing parser error", async () => {
    const compiler = getCompiler("exampleFile.js", {use: []});
    const stats = await compile(compiler);
    
    expect(stats.compilation.errors).toHaveLength(1);
    expect(stats.compilation.errors[0].error.message).toBe("Cannot `process` without `Parser`")
  });
  
  it("should propagate missing compiler error", async () => {
    const compiler = getCompiler("exampleFile.js", {use: [parserPlugin]});
    const stats = await compile(compiler);
    
    expect(stats.compilation.errors).toHaveLength(1);
    expect(stats.compilation.errors[0].error.message).toBe("Cannot `process` without `Compiler`")
  });
  
  it("should accept a parser and compiler", async () => {
    const compiler = getCompiler("exampleFile.js", {use: [parserPlugin, compilerPlugin]});
    const stats = await compile(compiler);
    
    expect(stats.compilation.errors).toHaveLength(0);
  });
  
  it("should accept an array with [plugin, options]", async () => {
    const compiler = getCompiler("exampleFile.js", {use: [[parserPlugin, {}], [compilerPlugin, {}]]});
    const stats = await compile(compiler);
    
    expect(stats.compilation.errors).toHaveLength(0);
  });
  
});

describe("validate unify processing", () => {
  
  it("should successfully compile", async () => {
    const compiler = getCompiler("exampleFile.js", {use: [parserPlugin, compilerPlugin]});
    const stats = await compile(compiler);
    
    expect(stats.compilation.errors).toHaveLength(0);
    expect(stats.compilation.errors[0].error.message).toBe("Cannot `process` without `Parser`")
  });
  
  it("should propagate errors during processing", async () => {
    const compiler = getCompiler("exampleFile.js", {use: [parserPlugin, compilerPluginWithError]});
    const stats = await compile(compiler);
    
    expect(stats.compilation.errors).toHaveLength(1);
    expect(stats.compilation.errors[0].error.message).toBe("Whoops!")
  });
  
});
