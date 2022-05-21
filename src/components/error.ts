class HeadError extends Error {
  constructor(m: string) {
    super(m)
    this.name = 'error'
  }
}
export function throwError(scope: string, m: string): never {
  throw new HeadError(`[${scope}] ${m}`)
}
