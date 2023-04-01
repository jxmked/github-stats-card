export type IColorConstructor = Partial<IRGBA>;

export class Colors {
  public r: number;
  public g: number;
  public b: number;
  public a: number;

  constructor(args?: IColorConstructor) {
    const { r, g, b, a } = Object.assign(
      {
        r: 0,
        g: 0,
        b: 0,
        a: 1
      },
      args ?? {}
    ) satisfies IRGBA;

    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  public get attr(): IRGBA {
    return Object.assign({}, this) satisfies IRGBA;
  }
}
