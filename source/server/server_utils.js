export function isDevelopment() {
  const { NODE_ENV } = process.env;
  return NODE_ENV === "development" || !NODE_ENV;
}

export function isProduction() {
  const { NODE_ENV } = process.env;
  return NODE_ENV === "production";
}
