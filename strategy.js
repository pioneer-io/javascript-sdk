class Strategy {
  // modulus for getting the hashedPercentage
  static modulus = 100
  
  constructor({percentage}) {
    this.percentage = percentage;
  }

  calculate(context) {
    // calculate if we should use the new value based on percentage rollout

    //get the key
    const key = context.getKey();

    // calculate the hashed percentage
    const hashedPercentage = this.getHashBasedPercentage(key);
    
    // check if the hashedPercentage meets the requirements
    // if it matches, then return the strategy value
    return hashedPercentage <= this.percentage;
  }

  // just adds up all the charCodes in the string and calculate the percentage
  getHashBasedPercentage(string) {
    const charArr = string.split('');
    const sum = charArr.reduce((sum, char) => {
      return sum + char.charCodeAt();
    }, 0);
    const hashedPercentage = ((sum % Strategy.modulus) + 1);
    return hashedPercentage;
  }
}

module.exports = Strategy;