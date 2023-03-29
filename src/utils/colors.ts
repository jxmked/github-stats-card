
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





const s : number = Colors("8384")