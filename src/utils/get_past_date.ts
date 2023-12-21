const getPastDate = (ms: number): Date => new Date(Date.now() - ms)

export default getPastDate
