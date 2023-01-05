export const fullUrl = (path: string) => {
    const url = new URL(path, process.env.NEXTAUTH_URL);
    return url;
  };
  