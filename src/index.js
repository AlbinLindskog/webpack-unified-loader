import schema from "./options.json";


export default async function loader(content) {
  const options = this.getOptions(schema);
  const callback = this.async();
  
  let unified;
  try {
    ({ unified } = await import("unified"));
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
