class Strategy {
  // modulus for getting the hashedPercentage
  static modulus = 100
  
  constructor({percentage, value}) {
    this.percentage = percentage;
    this.value = value;
  }

  calculate(context) {
    // calculate if we should use the new value based on percentage rollout

    //get the key
    const key = context.getKey();

    // calculate the hashed percentage
    const hashedPercentage = ((this.basicHash(key) % Strategy.modulus) + 1) / Strategy.modulus;
    
    // check if the hashedPercentage meets the requirements
    // if it matches, then return the strategy value
    if (hashedPercentage <= this.percentage) {
      return this.value;
    } else {
      return null;
    }
  }

  // just adds up all the charCodes in the string
  basicHash(string) {
    const charArr = string.split('');
    const sum = charArr.reduce((sum, char) => {
      return sum + char.charCodeAt();
    }, 0);
    return sum;
  }
}

module.exports = Strategy;