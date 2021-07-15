const handleUndefinedFeature = (key, defaultValue) => {
  if (defaultValue !== undefined && defaultValue !== null) {
    console.warn(`Warning: Could not get ${key} from features, using provided default value!`);
    return defaultValue;
  }
  throw new Error(`Error: ${key} does not exist, cannot get get feature!`);
}

module.exports = handleUndefinedFeature;