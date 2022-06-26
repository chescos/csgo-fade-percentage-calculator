class RandomNumberGenerator {
  mIdum: number;

  mIy: number;

  mIv: Array<number>;

  NTAB: number;

  IA: number;

  IM: number;

  IQ: number;

  IR: number;

  NDIV: number;

  AM: number;

  RNMX: number;

  constructor() {
    this.mIdum = 0;
    this.mIy = 0;
    this.mIv = [];

    this.NTAB = 32;
    this.IA = 16807;
    this.IM = 2147483647;
    this.IQ = 127773;
    this.IR = 2836;
    this.NDIV = 1 + (this.IM - 1) / this.NTAB;
    this.AM = 1.0 / this.IM;
    this.RNMX = 1.0 - 1.2e-7;
  }

  setSeed(seed: number): void {
    this.mIdum = seed;

    if (seed >= 0) {
      this.mIdum = -seed;
    }

    this.mIy = 0;
  }

  generateRandomNumber(): number {
    let k: number;
    let j: number;

    if (this.mIdum <= 0 || this.mIy === 0) {
      if (-this.mIdum < 1) {
        this.mIdum = 1;
      } else {
        this.mIdum = -this.mIdum;
      }

      for (j = this.NTAB + 7; j >= 0; j -= 1) {
        k = Math.floor(this.mIdum / this.IQ);
        this.mIdum = Math.floor(this.IA * (this.mIdum - k * this.IQ) - this.IR * k);

        if (this.mIdum < 0) {
          this.mIdum += this.IM;
        }

        if (j < this.NTAB) {
          this.mIv[j] = this.mIdum;
        }
      }

      [this.mIy] = this.mIv;
    }

    k = Math.floor(this.mIdum / this.IQ);
    this.mIdum = Math.floor(this.IA * (this.mIdum - k * this.IQ) - this.IR * k);

    if (this.mIdum < 0) {
      this.mIdum += this.IM;
    }

    j = Math.floor(this.mIy / this.NDIV);

    this.mIy = Math.floor(this.mIv[j]);
    this.mIv[j] = this.mIdum;

    return this.mIy;
  }

  randomFloat(low: number, high: number): number {
    let float: number = this.AM * this.generateRandomNumber();

    if (float > this.RNMX) {
      float = this.RNMX;
    }

    return (float * (high - low)) + low;
  }
}

export default RandomNumberGenerator;
