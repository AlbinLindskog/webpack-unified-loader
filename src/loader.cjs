"use strict";

async function loader(content) {
  const options = this.getOptions();
  const callback = this.async();
  
  let unified;
  try {
    // EMS imports are async, CJS are not, so you can always import CJS in ESM, but not vice-versa,
    // unless you are importing it in an async context. Luckily webpack supports async loaders, so
    // that's the route we're taking, we just have to check if we imported it as an ESM or a CJS.
    (unified = await import('unified'))
    unified = unified.unified || unified.default
  } catch (error) {
    callback(error);
    return;
  }
  
  const processor = unified();
  
  const use = options.use || []
  for (const plugin of use) {
    if (Array.isArray(plugin)) {
      processor.use(...plugin);
    } else {
      processor.use(plugin);
    }
  }
  
  let file;
  try {
    (file = await processor.process(content));
  } catch (error) {
    callback(error);
    return;
  }

  callback(null, String(file));
}


exports.default = loader;
