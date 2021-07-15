class FakeStrategy {
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
    const hashedPercentage = this.getHashBasedPercentage(key);
    
    // check if the hashedPercentage meets the requirements
    // if it matches, then return the strategy value
    if (hashedPercentage <= this.percentage) {
      return this.value;
    } else {
      return null;
    }
  }

  // just adds up all the charCodes in the string
  getHashBasedPercentage(string) {
    const charArr = string.split('');
    const sum = charArr.reduce((sum, char) => {
      return sum + char.charCodeAt();
    }, 0);
    const hashedPercentage = ((sum % FakeStrategy.modulus) + 1) / FakeStrategy.modulus;
    return hashedPercentage;
  }

  basicHash(string) {
    const charArr = string.split('');
    const sum = charArr.reduce((sum, char) => {
      return sum + char.charCodeAt();
    }, 0);
    return sum;
  }

  static basicHash(string) {
    const charArr = string.split('');
    const sum = charArr.reduce((sum, char) => {
      return sum + char.charCodeAt();
    }, 0);
    return sum;
  }
}

module.exports = FakeStrategy;