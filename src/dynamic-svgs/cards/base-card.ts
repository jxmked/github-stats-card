
import BaseAbstractClass, {IBasicProps, IConstructorArgs} from '../base-abstract-object';


import DefaultCard from './starship-avalon';
import SampleTwo from './sample-two';



export type IUninitCard  = new (dataParams: IConstructorArgs) => BaseAbstractClass<object & IBasicProps>;


const mapCard = new Map<string, IUninitCard>();


mapCard.set("default", DefaultCard)
mapCard.set("sampleTwo", SampleTwo)

export default mapCard;


/**
 * Sample if worked. 
 * the "const data = 5 as any;" is just to bypass 
 * constructor args but it will never be used in actual code
 * it just for interface check.
 * 
 * */
 
 /*
const x = mapCard.get("default")!;
const data = 5 as any;
const ini = new x(data);


ini.move({x: 0, y: 0})

*/