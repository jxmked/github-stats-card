/* 
export type IColorArgs = string|IRGBA;
export type IColorReturnType <T> = T extends string ? T : T extends IRGBA ? IRGBA : void;

export function Colors<T>(arg: IColorArgs): IColorReturnType<T>{
  
  if(typeof arg === 'string') {
    return "0" as IColorReturnType<T>;
  }
  
  return {
    r: 0,
    g: 0,
    b: 0,
    a: 0
  } as IColorReturnType<T>
}





const s : number = Colors("8384") */


/* 
class Colors {
  private valueType : string;
  private value: IRGBA;

  constructor(private setColor:string|IRGBA) {
      this.valueType = "hex"
      this.value = {r:0,g:0,b:0, a: 0};
      
      if(this.isRGBA()) {
          this.value = this.setColor as IRGBA;
      } else {

      }
   }

  

  private isRGBA(): boolean {
      try {
          const sample = this.setColor as IRGBA;
          const test = (k: keyof IRGBA ) => typeof sample[k] === void 0;
          
          if(test("r") || test("b") || test("g") || test("a")) return false;

          return true;
      } catch(err) {
          return false;
      }
  }

  get hex(): string {
      const normalize = (num:number) => {
          const parsed = num.toString(16);
          return (parsed.length === 1) ? `0${parsed}` : parsed;
      }
      const {r,g,b} = this.setColor as IRGBA;

      return `#${normalize(r)}${normalize(g)}${normalize(b)}`
  }

  private hexToRgb() {
      const testCase = this.setColor as string;
      const result = testCase.matchAll(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
      return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
      } : null;
  }
} */
