export function condition(cond, test) {
  /*
  Utility that allows us to conditionally run test cases.
  
  This is necessary since webpack does not support ESM, so we can't run the
  tests that depends on webpack with jest in ESM mode. But I still want to
  ensure that project works in ESM mode, so I need to conditionally run the
  test that depends on webpack based on jest mode, hence this.
   */
  if (cond) {
    return test()
  }
}


export const isESM = process.env.TEST_MODE === 'esm';


export const isCJS = process.env.TEST_MODE !== 'esm';