
export const formatError = (err: any) => {
    const toReturn: { status: 'E'; message: string; metaData?: any } = {
      status: 'E',
      message: ''
    };
    toReturn.message = err?.message || err?.msg || err;
    if (err.metaData) toReturn.metaData = err.metaData;
    return toReturn;
  };