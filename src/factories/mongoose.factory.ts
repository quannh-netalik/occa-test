import config from 'config';

export const mongooseFactory = async (): Promise<{
  uri: string;
}> => {
  const connectionString = config.get<string>('dbUri');

  return {
    uri: connectionString,
  };
};
